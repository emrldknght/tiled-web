<?php


namespace SteamQ;

class CharSlot
{
    public int $itemId = 0;
    public ?Weapon $itemData = null;

    public function __construct(array $arr)
    {
        $this->itemId = $arr['itemId'];
        $this->itemData = $arr['itemData'];
    }
}
