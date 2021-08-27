<?php


namespace SteamQ;

use PDO;

class RestApiHooks {
    public static function weaponGet($id): ?Weapon
    {

        $q = DBEntity::$pdo->prepare("SELECT * FROM weapon WHERE `id` = ?");
        $q->execute([$id]);
        $data = $q->fetch(PDO::FETCH_ASSOC);

        return (gettype($data) === 'array')
            ? new Weapon($data)
            : null
            ;
    }
    public static function armorGet($id): ?Armor
    {
        $q = DBEntity::$pdo->prepare("SELECT * FROM armor WHERE `id` = ?");
        $q->execute([$id]);
        $data = $q->fetch(PDO::FETCH_ASSOC);

        return (gettype($data) === 'array')
            ? new Armor($data)
            : null
            ;
    }
    public static function spellGet($id): ?Spell
    {
        $q = DBEntity::$pdo->prepare("SELECT * FROM spell WHERE `id` = ?");
        $q->execute([$id]);
        $data = $q->fetch(PDO::FETCH_ASSOC);

        return (gettype($data) === 'array')
            ? new Spell($data)
            : null
            ;
    }
    public static function charGet($id): ?Character {
        $q = DBEntity::$pdo->prepare("SELECT * FROM char_data WHERE `id` = ?");
        $q->execute([$id]);
        $data = $q->fetch(PDO::FETCH_ASSOC);

        if(gettype($data) !== 'array') { return null; }

        $char = new Character($data);

        $char->Slots->mainHand = new CharSlot([
            'itemId' => 1,
            'itemData' => self::weaponGet(5)
        ]);

        return $char;
    }

    /**
     * @param string $query
     * @param string $type 'Weapon' | 'Armor'
     * @return ListItem[]
     */
    public static function getItemsList(string $query, string $type = 'weapon'): array
    {

        $q = DBEntity::$pdo->prepare($query);
        $q->execute();
        $data = $q->fetchAll();

        $items = [];

        foreach ($data as $v) {
            $id = $v['id'];
            $name = $v['name'];
            $itemType = $type;
            $items[] = new ListItem($id, $name, $itemType);
        }
        return $items;
    }

    /**
     * @return ListItem[]
     */
    public static function getWeaponsList(): array
    {
        $q = "SELECT `id`, `name` FROM weapon";
        return self::getItemsList($q, 'Weapon');
    }
    /**
     * @return ListItem[]
     */
    public static function getArmorList(): array
    {
        $q = "SELECT `id`, `name` FROM armor";
        return self::getItemsList($q, 'Armor');
    }
}