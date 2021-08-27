<?php

namespace SteamQ;

class Armor
{
    use MapArrToProps;

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
        $this->map($this, $arr);
    }
}