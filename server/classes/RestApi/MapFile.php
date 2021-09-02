<?php

namespace SteamQ\RestApi;

class MapFile {
    public int $id;
    public string $name;
    public int $tileDim;
    public string $tileUrl;
    public array $mapData;
    public function __construct(array $arr)
    {
        $this->id = $arr['id'];
        $this->name = $arr['name'];
        $this->tileDim = $arr['tileDim'];
        $this->tileUrl = $arr['tileUrl'];

        $this->mapData = json_decode($arr['mapData']);
    }
}