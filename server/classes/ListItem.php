<?php

namespace SteamQ;

class ListItem {
    public string $id;
    public string $name;

    /**
     * @var string 'Weapon' | 'Armor'
     */
    public string $itemType;
    public function __construct($id, $name, $itemType)
    {
        $this->id = $id;
        $this->name = $name;
        $this->itemType = $itemType;
    }
}