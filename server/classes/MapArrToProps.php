<?php

namespace SteamQ;

use Exception;
use ReflectionClass;

trait MapArrToProps
{
    /**
     * @param object $ctx Class
     * @param $arr
     */
    public function map(object $ctx, $arr)
    {
        try {
            $r = new ReflectionClass(get_class($ctx));

            foreach ($r->getProperties() as $prop) {
                $name = $prop->name;
                $n = strtolower($prop->name);
                if (!empty($arr[$n])) {
                    $this->$name = $arr[$n];
                }
            }

        } catch (Exception $e) {
            var_dump($e->getMessage());
        }
    }

    public static function getInsertString(): string {
        $className = get_class();
        try {
            $r = new ReflectionClass($className);
            $k = count($r->getProperties());
            $defV = str_repeat("default, ", $k - 1) . "default";

            $k = strtolower($r->getShortName());
            return "INSERT INTO $k VALUES ($defV);";
        } catch (Exception $e) {
            var_dump($e->getMessage());
            return  '';
        }
    }
}
