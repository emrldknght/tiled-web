<?php

namespace SteamQ;

class Character
{
    public int $ID;
    public string $Name;
    public CharStats $Stats;
    public CharSlots $Slots;

    /**
     * Character constructor.
     * @param $arr array
     */
    public function __construct(array $arr)
    {
        $this->ID = $arr['id'] ?? -1;
        $this->Name = $arr['name'] ?? '';

        $this->Stats = new CharStats($arr);
        $this->Slots = new CharSlots($arr);
    }
}
