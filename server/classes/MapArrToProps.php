<?php

namespace SteamQ;

use ReflectionException;

trait MapArrToProps
{
    /**
     * @throws ReflectionException
     */
    public function map($ctx, $arr)
    {
        $r = new \ReflectionClass(get_class($ctx));
        foreach ($r->getProperties() as $prop) {
            $name = $prop->name;
            $n = strtolower($prop->name);
            // var_dump($n);
            if (!empty($arr[$n])) {
                $this->$name = $arr[$n];
            }
        }
    }
}
