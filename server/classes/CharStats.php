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

    /**
     * @throws \ReflectionException
     */
    public function __construct(array $arr)
    {
        $this->map($this, $arr);
        /*
        $this->Strength = $arr['strength'];
        $this->Dexterity = $arr['dexterity'];
        $this->Constitution = $arr['constitution'];
        $this->Intelligence = $arr['intelligence'];
        $this->Wisdom = $arr['wisdom'];
        $this->Charisma = $arr['charisma'];
        */
    }
}
