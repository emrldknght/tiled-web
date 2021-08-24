<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

error_reporting(E_ALL);
ini_set('display_errors', 1);

use SteamQ\Armor;
use SteamQ\Character;
use SteamQ\CharSlot;
use SteamQ\DBEntity;
use SteamQ\RestApi\ApiError;
use SteamQ\RestApi\Api;
use SteamQ\RestApi\ApiOk;
use SteamQ\RestApi\User;
use SteamQ\Spell;
use SteamQ\Weapon;

require __DIR__ . '/../vendor/autoload.php';

Api::$User = new User();

$path = Api::processPath();

$root = $path[1];
$action = $path[2];

$requestType = $_SERVER['REQUEST_METHOD'];

const MAPS_DIR = __DIR__.'/maps';

DBEntity::init();

$data = '';

Api::get('list-files', function () {
    $path = MAPS_DIR;
    $files = scandir($path);
    $files = array_diff($files, array('.', '..'));
    $files = array_values($files);
    return array_map(function ($file) {
        return basename($file, ".json");
    }, $files);
});

Api::get('items', function () {

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
});

Api::get('weapon', function () use ($path) {
    $id = $path[3];
    $q = DBEntity::$pdo->prepare("SELECT * FROM weapon WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    return (gettype($data) === 'array')
        ? new Weapon($data)
        : null
        ;
});
Api::post('weapon' , function () use ($path) {
    $id = $path[2];
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

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
        return new ApiError($e->getMessage());
    }

    return new ApiOk("weapon saved!");

});

Api::get('armor', function () use ($path) {
    $id = $path[3];
    $q = DBEntity::$pdo->prepare("SELECT * FROM armor WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    return (gettype($data) === 'array')
        ? new Armor($data)
        : null
        ;
});

Api::get('char', function () use ($path) {
    $id = $path[3] ?? 0;

    if($id === 0) {
        return new ApiError('id is empty');
    }

    $q = DBEntity::$pdo->prepare("SELECT * FROM char_data WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    if(gettype($data) !== 'array') { return null; }

    $char = new Character($data);

    $char->Slots->mainHand = new CharSlot([
        'itemId' => 1,
        'itemData' => getWeapon(1)
    ]);

    return $char;
});

Api::post('char', function () use ($path) {
    $id = $path[2];

    $answer = [
        'char' => 'Default Character',
        'data' => $id
    ];

    return json_encode($answer);

});

Api::get('map-file', function () use ($path) {

    $fPath = MAPS_DIR;
    $name = $path[2];

    try {
        $content = json_decode(file_get_contents($fPath . '/' . $name.".json"));
    } catch (Exception $e) {
        $content = new ApiError("file `$name` not found" );
    }
    return $content;

});

Api::post('map-file', function () use ($path) {
    $fPath = MAPS_DIR;
    $name = $path[2];

    $body = file_get_contents('php://input');

    $j = json_decode($body, true);
    print_r($j);

    try {
        file_put_contents($fPath . '/' . $name.".json", $j);
    } catch (Exception $e) {
        return new ApiError($e->getMessage());
    }

    return  new ApiOk('saved');

});

Api::get('spell', function () use($path) {
    $id = $path[3];
    $q = DBEntity::$pdo->prepare("SELECT * FROM spell WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    return (gettype($data) === 'array')
        ? new Spell($id, $data)
        : null
        ;
});

Api::get('test', function () {
    return 'test';
});

Api::post('test', function () {
    return json_decode(file_get_contents('php://input'));
});

if(Api::hasAction($action, $requestType)) {
    $data = Api::callAction($action, $requestType);
} else {
    $data = new ApiError("action not found");
}

// $answer = [ 'action' => $action, 'data' => $data ];
$answer = $data;

echo json_encode($answer, JSON_UNESCAPED_UNICODE);

