<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization");
header("Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS");
error_reporting(E_ALL);
ini_set('display_errors', 1);

use SteamQ\Character;
use SteamQ\CharSlot;
use SteamQ\DBEntity;
use SteamQ\RestApi\ApiError;
use SteamQ\RestApi\Api;
use SteamQ\RestApi\ApiOk;
use SteamQ\RestApi\User;
use SteamQ\Weapon;

require __DIR__ . '/../vendor/autoload.php';

Api::$User = new User();

$path = Api::processPath();
// print_r($path);
$root = $path[0];
$action = $path[1];
$requestType = $_SERVER['REQUEST_METHOD'];
// var_dump($requestType);

/*
$path1 = '/armor/{id}/{count}';
$path1 = explode('/', $path1);
$path1 = array_filter($path1);
// print_r($path1);

$args = [];
foreach ($path1 as $k=>$p) {
    preg_match('/\{.+\}/', $p, $m);
    // print_r($k);
    // print_r($m);
    if(!empty($m)) {
        $n = substr($m[0], 1, strlen($m[0]) - 2);
        // var_dump($n);
        $args[$n] = $path[$k];
    }
}

$cb = function () use ($args) {
    var_dump($args);
};
*/
// $cb();


DBEntity::init();

$data = '';

Api::get('list-files', function () {
    $path = __DIR__.'/maps';
    $files = scandir($path);
    $files = array_diff($files, array('.', '..'));
    $files = array_values($files);
    $files = array_map(function ($file) {
        return basename($file, ".json");
    }, $files);

    return $files;
});

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
Api::get('items', function () {
    return getItems();
});

function getWeapon(int $id): Weapon
{
    $q = DBEntity::$pdo->prepare("SELECT * FROM weapon WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    return new Weapon($data);
}
Api::get('weapon', function () use ($path) {
    $id = $path[2];
    return getWeapon($id);
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
    $id = $path[2];
    $q = DBEntity::$pdo->prepare("SELECT * FROM armor WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

    var_dump($data);

    // return new Weapon($data);
});

Api::get('char', function () use ($path) {
    $id = $path[2] ?? 0;

    if($id === 0) {
        return new ApiError('id is empty');
    }

    $q = DBEntity::$pdo->prepare("SELECT * FROM char_data WHERE `id` = ?");
    $q->execute([$id]);
    $data = $q->fetch(PDO::FETCH_ASSOC);

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

    $j = json_encode($answer);

    return $j;

});

Api::get('map-file', function () use ($path) {

    $fPath = __DIR__.'/maps';
    $name = $path[2];

    try {
        $content = json_decode(file_get_contents($fPath . '/' . $name.".json"));
    } catch (Exception $e) {
        $content = new ApiError("file `$name` not found" );
    }
    return $content;

});

Api::post('map-file', function () use ($path) {
    $fPath = __DIR__.'/maps';
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
    $id = $path[2];
    return $id;
});

if(Api::hasAction($action, $requestType)) {
    $data = Api::callAction($action, $requestType);
} else {
    $data = new ApiError("action not found");
}

// $answer = [ 'action' => $action, 'data' => $data ];
$answer = $data;

echo json_encode($answer, JSON_UNESCAPED_UNICODE);

