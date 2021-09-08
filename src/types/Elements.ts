type Air = 'Air';
type Earth = 'Earth';
type Fire = 'Fire';
type Water = 'Water';

type BasicElement = 'Air' | 'Earth' | 'Fire' |  'Water';
type NotBE<T extends BasicElement> = Exclude<BasicElement, T>

type NotAir = NotBE<'Air'>
type NotEarth = NotBE<'Earth'>
type NotFire = NotBE<'Fire'>
type NotWater = NotBE<'Water'>

type NotT<T extends BasicElement> = NotBE<T>;
export type CEE<T extends BasicElement> = `${T} + ${NotT<T>}`

const All: CEE<'Air'> = `${'Air'} + ${'Earth'}`;


export type CompositeElement = `${Air} + ${NotAir}`
    | `${Earth} + ${NotEarth}`
    | `${Fire} + ${NotFire}`
    | `${Water} + ${NotWater}`
    ;


const Sum: CompositeElement[] = [
    'Air + Earth',
    'Air + Fire',
    'Air + Water',
    'Earth + Fire',
    'Earth + Water',
    'Fire + Water',
    'Water + Air'
]


type BasicMetal = 'Gold' | 'Silver' | 'Tin' | 'Lead' | 'Iron' | 'Mercury' | 'Copper';
type Planet = 'Sun' | 'Moon' | 'Jupiter' | 'Saturn' | 'Mars' | 'Mercury' | 'Venus';

type A = BasicElement;
// type NotA = Exclude<A, BasicElement>

const CE: Map<CompositeElement, string> = new Map([
    [ 'Air + Earth', 'Dust'],


    [ 'Air + Fire', ''],
    [ 'Air + Water', ''],

    [ 'Earth + Fire', 'Lava'],
    [ 'Earth + Water', 'Tree'],
    [ 'Water + Earth', 'Mud'],

    [ 'Fire + Water', 'Steam'],
    [ 'Water + Air', '']
])



