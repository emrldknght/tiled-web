<?php

namespace SteamQ;

use ReflectionClass;

class Spell {

    public int $id;
    public string $nameOf = '';
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
    public string $spellResistance = '';

    public function __construct(int $id, array $data)
    {
        $this->id = $id;

        $r = new ReflectionClass(self::class);
        foreach ($r->getProperties() as $prop) {
            $name = $prop->name;
            // var_dump($name);
            $type = gettype($this->$name);
            // var_dump($name.":".$type);

            if(!empty($this->$name)) {
                $v = $data[$name];
                if(gettype($v) === $type) {
                    $this->$name = $data[$name];
                }
            }
        }

        /*
        $this->nameOf = $data['nameOf']; // varchar(32) default 'Name' not null,
        $this->type = $data['type']; // varchar(32) default 'arcane' null,
        $this->description = $data['description']; // text null,
        $this->school = $data['school']; // varchar(32) default '' null,
        $this->elementalSchool = $data['elementalSchool'] ?? ''; // varchar(32) default '' null,
        $this->castingTime = $data['castingTime']; // int default 1,
        $this->components = $data['components'] ?? ''; // varchar(32) default '',
        $this->range = $data['range']; // varchar(32) default '',
        $this->area = $data['area'] ?? ''; // varchar(32) default '',
        $this->targets = $data['targets'] ?? ''; // varchar(32) default '',
        $this->effect = $data['effect'] ?? ''; // varchar(32) default '',
        $this->duration = $data['duration'] ?? ''; // varchar(32) default 'instantaneous',
        $this->savingThrow = $data['savingThrow']; // varchar(32) default '',
        $this->spellResistance = $data['spellResistance']; // varchar(16) default ''
        */
    }
    static public function getFL(): string {
        $r = new ReflectionClass(self::class);
        $k =  count($r->getProperties());
        $defV = str_repeat("default, ", $k -1)."default";
        return "INSERT INTO spell VALUES ($defV);";
    }

}