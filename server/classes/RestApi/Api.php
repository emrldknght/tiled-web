<?php

namespace SteamQ\RestApi;

class Api {

    public static ?User $User = null;

    public static function processPath(): array
    {
        $parsed_url = parse_url($_SERVER['REQUEST_URI']);
        $path = $parsed_url['path'];
        $pathArr = [];
        if (!empty($path)) {
            $pathArr = explode('/', $path);
            $pathArr = array_filter($pathArr, function ($el) {
                return !empty($el);
            });
            $pathArr = array_values($pathArr);
        }
        return $pathArr;
    }
    public static array $paths = [
        'GET' => [],
        'POST' => []
    ];

    public static array $defaultRestrictions = [
        'auth' => false,
        'admin' => false
    ];

    public static function hasAction(string $name, string $type): bool
    {
        return array_key_exists($name, self::$paths[$type]);
    }

    public static function get(string $name, callable $cb, array $restrictions = [])
    {
        self::addAction($name, $cb, $restrictions, 'GET');
    }

    public static function post(string $name, callable $cb, array $restrictions = [])
    {
        self::addAction($name, $cb, $restrictions, 'POST');
    }

    public static function addAction(string $name, callable $cb, array $restrictions = [], string $type = 'get')
    {
        $restrictions = array_merge(self::$defaultRestrictions, $restrictions);
        self::$paths[$type][$name] = [
            'cb' => $cb,
            'rest' => $restrictions,
            'type' => 'post'
        ];
    }

    private static function checkRestrictions($restrictions): array
    {
        $data = [];
        if ($restrictions['auth'] && !self::$User->IsAuthorized()) {
                $data['error'] = 'Not authorized!';
        }
        if ($restrictions['admin'] && !self::$User->IsAdmin()) {
                $data['error'] = 'Insufficient rights!';
        }
        return $data;
    }

    public static function callAction(string $action, string $type)
    {
        $data = [];

        if (!self::hasAction($action, $type)) {
            $error = "API: action $action not supported!";
            $data['error'] = $error;
            return $data;
        }

        $handler = self::$paths[$type][$action];

        $restrictions = $handler['rest'];
        if(!empty(self::checkRestrictions($restrictions)['error'])) { return $data; }

        return $handler['cb']();
    }
}