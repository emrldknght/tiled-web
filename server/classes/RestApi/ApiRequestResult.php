<?php

namespace SteamQ\RestApi;

class ApiRequestResult {
    public string $status;

    public function __construct(string $status)
    {
        $this->status = $status;
    }
}