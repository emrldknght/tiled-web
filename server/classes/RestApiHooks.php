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
    public static function weaponGetByCode(string $code): ? Weapon
    {
        $q = DBEntity::$pdo->prepare("SELECT * FROM weapon WHERE `code` = ?");
        $q->execute([$code]);
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

    /**
     * @return array<string, Weapon | Armor>
     */
    public static function getItemDict(array $slotsData): array
    {
        $slotsRaw = '(' . implode(',', array_map(function ($item) {
                return "'".$item."'";
            } ,$slotsData)) . ')';
        $q = DBEntity::$pdo->prepare("SELECT * FROM weapon WHERE weapon.code IN $slotsRaw");
        $q->execute();
        $wData = $q->fetchAll();

        $itemList = [];
        foreach ($wData as $w) {
            $itemList[$w['code']] = new Weapon($w);
        }
        return $itemList;
    }

    public static function addSlot(Character $char, array $itemList, array $slotsData, string $slot) {
        if(!array_key_exists($slot, $slotsData)) { return; }
        $itemCode = $slotsData[$slot];

        if(!array_key_exists($itemCode, $itemList)) { return; }
        $data = $itemList[$itemCode];

        if(!empty($data)) {
            $char->Slots->$slot = new CharSlot([
                'itemId' => $data->id,
                'itemData' => $data
            ]);
        }
    }

    public static function charGet($id): ?Character {
        $q = DBEntity::$pdo->prepare("SELECT * FROM char_data WHERE `id` = ?");
        $q->execute([$id]);
        $data = $q->fetch(PDO::FETCH_ASSOC);

        if(gettype($data) !== 'array') { return null; }

        $slotsData = [
            'mainHand' => $data['slotMainHand'],
            'offHand' => $data['slotOffHand']
        ];

        $char = new Character($data);

        $itemList = self::getItemDict($slotsData);

        self::addSlot($char, $itemList, $slotsData, 'mainHand');
        self::addSlot($char, $itemList, $slotsData, 'offHand');

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