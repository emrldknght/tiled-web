<?php

namespace SteamQ\RestApi;

class ApiOk extends ApiRequestResult {
    public string $result;
    public array $data;

    public function __construct(string $result, array $data = [])
    {
        parent::__construct('ok');
        $this->result = $result;
        $this->data = $data;
    }
}