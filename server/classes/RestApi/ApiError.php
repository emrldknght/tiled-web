<?php

namespace SteamQ\RestApi;

class ApiError extends ApiRequestResult {
    public string $error;

    public function __construct(string $error)
    {
        parent::__construct('error');
        $this->error = $error;
    }
}