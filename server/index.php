<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Psr7\UploadedFile;
use Slim\Views\PhpRenderer;

use SteamQ\Character;
use SteamQ\CharSlot;
use SteamQ\Config;
use SteamQ\DBEntity;
use SteamQ\RestApi\ApiError;
use SteamQ\RestApi\ApiOk;
use SteamQ\Weapon;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath(Config::$basePath);
// $app->setBasePath("/server");


$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . '/upload';

DBEntity::init();

$container['db'] = '';

$app->get('/', function (Request $request, Response $response, $args) {
    $renderer = new PhpRenderer('templates');
    return $renderer->render($response, "file_form.php", $args);

    // $response->getBody()->write("Hello world!");
    // return $response;
});


$app->get('/books/{id}', function ($request, $response, array $args) {
    // Show book identified by $args['id']

    $id = $args['id'];

    $response->getBody()->write("books!: $id");
    return $response;
});


$app->post('/send-map', function ($request, $response, array $args) {

    $uploadPath = __DIR__. '/upload'; // $this->get('upload_directory');
    $files = $request->getUploadedFiles();

    $file = $files['mapfile'];
    if ($file->getError() === UPLOAD_ERR_OK) {
        $filename = moveUploadedFile($uploadPath, $file);
        $response->getBody()->write('uploaded ' . $filename . '<br/>');
        return $response;
    }

    $response->getBody()->write('upload failed <br/>');
    return $response;
});

/**
 * @throws Exception
 */
function moveUploadedFile(string $directory, UploadedFile $uploadedFile): string
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf('%s.%0.8s', $basename, $extension);

    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}

$app->get('/list-files', function (Request $request, Response $response, $args) {

    $path = __DIR__.'/maps';
    $files = scandir($path);
    $files = array_diff($files, array('.', '..'));
    $files = array_values($files);
    $files = array_map(function ($file) {
        return basename($file, ".json");
    }, $files);

    // $fd = array_map(fn($item) => ['name' => $item, 'isDir' => is_dir($path.'/'.$item) ], $files);

    $response = $response->withHeader('Content-Type', 'application/json');
    // 'files list here:'.
    $response->getBody()->write(json_encode($files));
    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

$app->get('/map-file/{name}', function (Request $request, Response $response, $args) {
    $path = __DIR__.'/maps';
    $name = $args['name'];

    set_error_handler(
        function ($errno, $errstr, $errfile, $errline) {
            throw new ErrorException($errstr, $errno, $errno, $errfile, $errline);
        }
    );

    // $content = '[]';

    try {
        $content = file_get_contents($path . '/' . $name.".json");
    } catch (Exception $e) {
        $content = json_encode([ 'error' => "file `$name` not found" ]); // $e->getMessage()
    }
    restore_error_handler();



    $response = $response->withHeader('Content-type', 'application/json');

    if (!empty($content['error'])) {
        $response->getBody()->write("File not found".$content."?");
    } else {
        $response->getBody()->write($content);
    }
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});
$app->post('/map-file/{name}', function (Request $request, Response $response, $args) use ($app) {
    $path = __DIR__.'/maps';
    $name = $args['name'];

    // concat empty string to get stream content as string
    $body = "".$request->getBody()."";

    $j = json_decode($body, true);
    // print_r($j);

    // $response->getBody()->write(":".json_encode($j).":".gettype($body));
    file_put_contents($path.'/'.$name.'.json', $j);

    $answer = [
        'name' => $name,
        'data' => $j,
        'status' => 'ok!'
    ];

    // $response->getBody()->write("");
    $response->getBody()->write(json_encode($answer));

    /*
    if (!empty($content['error'])) {
        $response->getBody()->write("File not found".$content."?");
    } else {
        $response->getBody()->write("k:".$body.":".gettype($body));
        // $response->getBody()->write(json_encode(['m' => $method]));
    }
    */
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type')
        ->withHeader('Content-type', 'application/json')
        ;
});



$app->get('/char/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];

    $response = $response->withHeader('Content-type', 'application/json');

    $q = DBEntity::$pdo->prepare("SELECT * FROM char_data WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    $char = new Character($data);

    $char->Slots->mainHand = new CharSlot([
        'itemId' => 1,
        'itemData' => getWeapon(1)
    ]);

    $answer = [
        'char' => $char,
        // 'data' => $data
    ];

    $response->getBody()->write(json_encode($char));

    return $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

$app->post('/char/{id}', function (Request $request, Response $response, $args) {

    $id = $args['id'];

    // $response = $response->withHeader('Content-type', 'application/json');

    $answer = [
        'char' => 'Default Character',
        'data' => $id
    ];

    $j = json_encode($answer);
    // $je = json_last_error_msg();

    $response->getBody()->write($j); // json_encode($answer));

    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        // ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        // ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        // ->withHeader('Content-type', 'application/json')
        ;
});

function getWeapon(int $id): Weapon
{
    $q = DBEntity::$pdo->prepare("SELECT * FROM weapon WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    return new Weapon($data);
}

$app->get('/weapon/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];
    $response = $response->withHeader('Content-type', 'application/json');

    $weapon = getWeapon($id);

    $response->getBody()->write(json_encode($weapon));
    return $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

$app->post('/weapon/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];

    $data = json_decode($request->getBody(), true);

    $answer = [
        'id' => $id,
        'data' => $data,
    ];

    $name = $data['name'];
    $damage = $data['damage'];
    $crit_min = $data['crit_min'];
    $crit_max = $data['crit_max'];
    $type = $data['type'];
    $category = $data['category'];
    $proficiency = $data['proficiency'];
    $weight = $data['weight'];
    $cost = $data['cost'];

    $sql = "UPDATE weapon SET name = ?, damage = ?, crit_min = ?, crit_max = ?, type = ?, category = ?, proficiency = ?, weight = ?, cost = ? WHERE id = $id";
    try {
        $q = DBEntity::$pdo->prepare($sql);
        $q->execute([$name, $damage, $crit_min, $crit_max, $type, $category, $proficiency, $weight, $cost]);
    } catch (Exception $e) {
        $answer['e'] = $e->getMessage();
    }

    $j = json_encode($answer);
    $response->getBody()->write($j);

    return $response
        ->withHeader('Access-Control-Allow-Origin', '*');
});

$app->post('/armor/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];

    $data = json_decode($request->getBody(), true);

    $answer = [
        'id' => $id,
        'data' => $data,
    ];

    $name = $data['name'];
    $type = $data['type'];
    $armorBonus = $data['armorBonus'];
    $maxDexBonus = $data['maxDexBonus'];
    $armorCheckPenalty = $data['armorCheckPenalty'];
    $arcaneSpellFailureChance = $data['arcaneSpellFailureChance'];
    $speed = $data['speed'];
    $weight = $data['weight'];
    $cost = $data['cost'];

    $sql = "UPDATE armor SET name = ?, type = ?, `armorBonus` = ?, `maxDexBonus` = ?, `armorCheckPenalty` = ?, `arcaneSpellFailureChance` = ?, speed = ?, weight = ?, cost = ? WHERE id = $id";
    try {
        $q = DBEntity::$pdo->prepare($sql);
        $q->execute([$name, $type, $armorBonus, $maxDexBonus, $armorCheckPenalty, $arcaneSpellFailureChance, $speed, $weight, $cost]);
    } catch (Exception $e) {
        $answer['e'] = $e->getMessage();
    }

    $j = json_encode($answer);
    $response->getBody()->write($j);

    return $response
        ->withHeader('Access-Control-Allow-Origin', '*');
});

/**
 * @return Weapon[]
 */
function getItems(): array
{
    $q = DBEntity::$pdo->prepare("SELECT `id`, `name` FROM weapon");
    $q->execute();
    $data = $q->fetchAll();

    $items = [];

    foreach ($data as $v) {
        $items[] = [
            'id' => $v['id'],
            'name' => $v['name'],
            'itemType' => 'Weapon'
        ] ; // new Weapon($v);
    }

    return $items;
}

$app->get('/items', function (Request $request, Response $response) {
    $response = $response->withHeader('Content-type', 'application/json');

    $items = getItems();

    $response->getBody()->write(json_encode($items));
    return $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

$app->get('/item-add/{type}', function (Request  $request, Response $response, $args) {
    $response = $response->withHeader('Content-type', 'application/json');

    $type = $args['type'];

    $data = [
      'action' => 'add-item',
      'type' => $type,
    ];

    if ($type === 'weapon') {
        $sql = "INSERT INTO weapon VALUES (default, default, default, default, default, default, default, default, default, default, default);";
    }
    if($type === 'armor') {
        $sql = "INSERT INTO armor VALUES (default, default, default, default, default, default, default, default, default, default);";
    }
    if(!empty($sql)) {
        try {
            $q = DBEntity::$pdo->prepare($sql);
            $q->execute();
            $answer = new ApiOk('item added', $data);
        } catch (Exception $e) {
            $answer['e'] = $e->getMessage();
            $answer = new ApiError($e->getMessage());
        }
    } else {
        $answer = new ApiError("type $type not supported");
    }

    $response->getBody()->write(json_encode($answer));
    return $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

function getSpell($id): array {
    $items = [];
    if($id) {
        $sql = "SELECT * FROM spell WHERE id = $id";
        $q = DBEntity::$pdo->prepare($sql);
        $q->execute();
        $data = $q->fetchAll();

        foreach ($data as $spell) {
            $items[] = [
                'id' => $spell['id'],
                'nameOf' => $spell['nameOf']
            ];
        }
    }
    return $items;
}

$app->get('/spell/{id}', function (Request $request, Response $response, $args) {
    $response = $response->withHeader('Content-type', 'application/json');
    $id = $args['id'] ?? 0;

    $item = getSpell($id);
    $answer = [
        'id' => $id,
        'item' => $item
    ];

    $response->getBody()->write(json_encode($answer));
    return $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

$app->post('/spell/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];
    $data = json_decode($request->getBody(), true);

    $answer = [
        'id' => $id,
        'data' => $data,
    ];

    if(empty(getSpell($id))) {
        $sql = "INSERT INTO spell VALUES (default, default, default, default, default, default, default, default, default, default, default, default, default, default, default);";
    }

    $nameOf = $data['nameOf']; // varchar(32) default 'Name' not null,
    $type = $data['type']; // varchar(32) default 'arcane' null,
    $description = $data['description']; // text null,
    $school = $data['school']; // varchar(32) default '' null,
    $elementalSchool = $data['elementalSchool'] ?? ''; // varchar(32) default '' null,
    $castingTime = $data['castingTime']; // int default 1,
    $components = $data['components'] ?? ''; // varchar(32) default '',
    $range = $data['range']; // varchar(32) default '',
    $area = $data['area'] ?? ''; // varchar(32) default '',
    $targets = $data['targets'] ?? ''; // varchar(32) default '',
    $effect = $data['effect'] ?? ''; // varchar(32) default '',
    $duration = $data['duration'] ?? ''; // varchar(32) default 'instantaneous',
    $savingThrow = $data['savingThrow']; // varchar(32) default '',
    $spellResistance = $data['spellResistance']; // varchar(16) default ''

    $sql = "UPDATE spell SET name = ?, type = ?, description = ?, school = ?, elementalSchool = ?, castingTime = ?,".
        " components = ?, `range` = ?, area = ?, targets = ?, effect = ?, duration = ?, savingThrow = ?,".
        " resistance = ? WHERE id = $id";
    try {
        $q = DBEntity::$pdo->prepare($sql);
        $q->execute([
            $nameOf,
            $type,
            $description,
            $school,
            $elementalSchool,
            $castingTime,
            $components,
            $range,
            $area,
            $targets,
            $effect,
            $duration,
            $savingThrow,
            $spellResistance,
        ]);
        $answer['result'] = new ApiOk(json_encode($q->errorInfo()));
    } catch (Exception $e) {
        $answer['error'] = new ApiError($e->getMessage());
    }

    $j = json_encode($answer);
    $response->getBody()->write($j);

    return $response
        ->withHeader('Access-Control-Allow-Origin', '*');

});
$app->run();
