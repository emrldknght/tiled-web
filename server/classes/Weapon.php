<?php


namespace SteamQ;

class Weapon
{
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
    public function __construct(array $arr)
    {
        $r = new \ReflectionClass(self::class);
        foreach ($r->getProperties() as $prop) {
            $name = $prop->name;
            $n = strtolower($prop->name);
            // var_dump($n);
            $this->$name = $arr[$n];
        }
    }
}
