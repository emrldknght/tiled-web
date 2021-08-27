<?php

namespace SteamQ;

class Weapon
{
    use MapArrToProps;

    public int $id;
    public string $name;
    public string $damage;
    public int $crit_min;
    public int $crit_max;
    public int $crit_mult;
    public string $type;
    public string $category;
    public string $proficiency;
    public int $weight;
    public int $cost;
    public string $itemType = 'Weapon';

    public function __construct(array $arr)
    {
        $this->map($this, $arr);
    }
}
