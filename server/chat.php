<?php

use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use SteamQ\Chat;

require dirname(__DIR__) . '/vendor/autoload.php';
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    )
    , 8080
);
$server->run();

// start with php chat.php