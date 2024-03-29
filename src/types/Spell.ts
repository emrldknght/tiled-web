export enum SavingThrowE {
    Fortitude = 'Fortitude',
    Reflex = 'Reflex',
    Will = 'Will',
}
export type SavingThrow = keyof typeof SavingThrowE; // 'Fortitude' | 'Reflex' | 'Will'
export enum STEffectE {
    negates = 'negates',
    half = 'half'
}
export type STEffect = keyof typeof  STEffectE; // 'negates' | 'half'

export enum SpellComponentE {
    V = 'V',
    S = 'S',
    M = 'M'
}
export type SpellComponent = keyof typeof SpellComponentE; // 'V' | 'S' | 'M'

export enum SpellSchoolE {
    conjuration = 'conjuration',
    evocation = 'evocation',
    illusion = 'illusion',
    abjuration = 'abjuration'
}

export type SpellSchool = keyof typeof SpellSchoolE;

export enum SpellElementalSchoolE {
    earth = 'earth',
    fire = 'fire',
}
type SpellElementalSchool = keyof typeof SpellElementalSchoolE;
export enum SpellRangeE {
    close = 'close',
    long = 'long',
    touch = 'touch'
}
type SpellRange = keyof typeof SpellRangeE;

export type SavingThrowT = 'none' | `${SavingThrow}` | `${SavingThrow} ${STEffect}`;

export enum SpellTypeE {
    arcane = 'arcane',
    divine = 'divine'
}
export type SpellType = keyof typeof SpellTypeE;

export interface Spell {
    id: number,
    nameOf: string,
    school: SpellSchool,
    elementalSchool?: SpellElementalSchool,

    // casting
    castingTime: number,
    components? : string | SpellComponent[]
    range: SpellRange
    area?: string,
    targets?: string,
    effect?: string,
    duration: string | 'instantaneous',
    savingThrow: SavingThrowT
    spellResistance: 'no' | 'yes',
    description: string,
    type: SpellType
}

const AcidSplash: Spell = {
    id: 1,
    nameOf: 'Acid Splash',
    type: 'arcane',
    school: 'conjuration',
    elementalSchool: 'earth',
    castingTime: 1,
    components: 'V, S',
    range: 'close',
    effect: 'one missile of acid',
    duration: 'instantaneous',
    savingThrow: 'none',
    spellResistance: 'no',
    description: 'You fire a small orb of acid at the target. You must succeed on a ranged touch attack to hit your target. The orb deals 1d3 points of acid damage. This acid disappears after 1 round.'
}
const Flare: Spell = {
    id: 2,
    nameOf: 'Flare',
    type: 'arcane',
    school: 'evocation',
    castingTime: 1,
    components: 'V',
    range: 'close',
    effect: 'burst of light',
    duration: 'instantaneous',
    savingThrow: 'Fortitude negates',
    spellResistance: 'yes',
    description: 'This cantrip creates a burst of light. If you cause the light to burst in front of a single creature, that creature is dazzled for 1 minute unless it makes a successful Fortitude save. Sightless creatures, as well as creatures already dazzled, are not affected by flare.'
}
const Fireball: Spell = {
    id: 12,
    nameOf: 'Fireball',
    type: 'arcane',
    school: 'evocation',
    elementalSchool: "fire",
    castingTime: 1,
    components: 'V, S, M',
    range: 'long',
    area: '20-ft-radius spread',
    duration: 'instantaneous',
    savingThrow: 'Reflex half',
    spellResistance: 'yes',
    description: 'A fireball spell generates a searing explosion of flame that detonates with a low roar and deals 1d6 points of fire damage per caster level (maximum 10d6) to every creature within the area. '
}
const ShadowWalk: Spell = {
    id: 14,
    nameOf: 'Shadow Walk',
    type: 'arcane',
    school: 'illusion',
    castingTime: 1,
    components: ['V', 'S', 'M'],
    range: 'touch',
    targets: 'up to one touched creature/level',
    duration: '1 hour / level',
    savingThrow: 'Will',
    spellResistance: 'yes',
    description: 'To use the shadow walk spell, you must be in an area of dim light. You and any creature you touch are then transported along a coiling path of shadowstuff to the edge of the Material Plane where it borders the Plane of Shadow. '
}

export const spellDB: {[key: number]: Spell} = {
    1: AcidSplash,
    2: Flare,
    12: Fireball,
    14: ShadowWalk
}

export type SpellP = Pick<Spell, 'id' | 'nameOf'>