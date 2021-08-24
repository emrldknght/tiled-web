<?php

namespace SteamQ;

use ReflectionClass;

class Armor
{
    public int $id;
    public string $name;

    public string $type;

    public int $armorBonus;
    public int $maxDexBonus;
    public int $armorCheckPenalty;
    public int $arcaneSpellFailureChance;
    public string $speed;

    public int $weight;
    public int $cost;
    public string $itemType = 'Armor';

    public function __construct(array $arr)
    {
        $r = new ReflectionClass(self::class);
        foreach ($r->getProperties() as $prop) {
            $name = $prop->name;
            $n = strtolower($prop->name);
            if(empty($this->$name) && !empty($arr[$n])) {
                $this->$name = $arr[$n];
            }
        }
    }
}