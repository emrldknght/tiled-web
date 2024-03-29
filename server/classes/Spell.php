<?php

namespace SteamQ;

class Spell {

    use MapArrToProps;

    public int $id;
    public string $name = '';
    public string $range = '';
    public string $type = '';
    public string $description = '';
    public string $school = '';
    public string $elementalSchool = '';
    public int $castingTime = 1;
    public string $components = '';
    public string $area = '';
    public string $targets = '';
    public string $effect = '';
    public string $duration = '';
    public string $savingThrow = '';
    public string $resistance = '';

    public function __construct(array $data)
    {
        $this->map($this, $data);
    }
}