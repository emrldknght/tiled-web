<?php
namespace SteamQ;

class CharStats
{
    public int $Strength;
    public int $Dexterity;
    public int $Constitution;
    public int $Intelligence;
    public int $Wisdom;
    public int $Charisma;

    use MapArrToProps;

    public function __construct(array $arr)
    {
        $this->map($this, $arr);
    }
}
