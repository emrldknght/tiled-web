<?php


namespace SteamQ;

class CharSlots
{

    public CharSlot $head;
    public CharSlot $neck;
    public CharSlot $shoulders;
    public CharSlot $body;

    public CharSlot $hands;
    public CharSlot $ringRight;
    public CharSlot $ringLeft;

    public CharSlot $mainHand;
    public CharSlot $offHand;

    public CharSlot $girdle;
    public CharSlot $feet;

    use MapArrToProps;

    public function __construct(array $arr)
    {
        $this->map($this, $arr);
    }
}
