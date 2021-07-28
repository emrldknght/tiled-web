<?php

namespace SteamQ;

use PDO;

class DBEntity
{
    public static ?PDO $pdo = null;



    public static function init(): void
    {
        // global $settings;
        // var_dump(self::$settings);

        self::$pdo = new PDO(
            "mysql:host=".Settings::$dbHost.";dbname=".Settings::$dbName,
            Settings::$dbUser,
            Settings::$dbPass
        );
        self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
}