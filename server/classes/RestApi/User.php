<?php

namespace SteamQ\RestApi;

class User {
    public function isAdmin(): bool
    {
        return true;
    }
    public function IsAuthorized(): bool
    {
        return true;
    }
}