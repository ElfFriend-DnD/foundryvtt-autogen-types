export = CONST;
export const vtt: "Foundry VTT";
export const VTT: "Foundry Virtual Tabletop";
export const WEBSITE_URL: "https://foundryvtt.com";
/**
 * Define the string name used for the base entity type when specific sub-types are not defined by the system
 * @type {String}
 */
export const BASE_ENTITY_TYPE: string;
/**
 * Valid Chat Message types
 * @type {Object}
 */
export const CHAT_MESSAGE_TYPES: any;
/**
 * The allowed Entity types which may exist within a Compendium pack
 * This is a subset of ENTITY_TYPES
 * @type {Array}
 */
export const COMPENDIUM_ENTITY_TYPES: any[];
/**
 * Define the set of languages which have built-in support in the core software
 * @type {string[]}
 */
export const CORE_SUPPORTED_LANGUAGES: string[];
/**
 * The default artwork used for Token images if none is provided
 * @type {String}
 */
export const DEFAULT_TOKEN: string;
/**
 * The default artwork used for Note placeables if none is provided
 * @type {String}
 */
export const DEFAULT_NOTE_ICON: string;
/**
 * The supported dice roll visibility modes
 * @type {Object}
 */
export const DICE_ROLL_MODES: any;
/**
 * The default configuration values used for Drawing objects
 * @type {Object}
 */
export const DRAWING_DEFAULT_VALUES: any;
/**
 * The allowed Drawing types which may be saved
 * @type {Object}
 */
export const DRAWING_TYPES: any;
/**
 * The allowed fill types which a Drawing object may display
 * NONE: The drawing is not filled
 * SOLID: The drawing is filled with a solid color
 * PATTERN: The drawing is filled with a tiled image pattern
 * @type {Object}
 */
export const DRAWING_FILL_TYPES: any;
/**
 * Define the allowed permission levels for a non-user Entity.
 * Each level is assigned a value in ascending order. Higher levels grant more permissions.
 * @type {Object}
 */
export const ENTITY_PERMISSIONS: any;
/**
 * Define the allowed Entity class types
 * @type {Array}
 */
export const ENTITY_TYPES: any[];
/**
 * Define the allowed Entity types which may be dynamically linked in chat
 * @type {Array}
 */
export const ENTITY_LINK_TYPES: any[];
/**
 * EULA version number
 * @type {String}
 */
export const EULA_VERSION: string;
/**
 * Define the allowed Entity types which Folders may contain
 * @type {Array}
 */
export const FOLDER_ENTITY_TYPES: any[];
/**
 * The maximum allowed level of depth for Folder nesting
 * @type {Number}
 */
export const FOLDER_MAX_DEPTH: number;
/**
 * The minimum allowed grid size which is supported by the software
 * @type {Number}
 */
export const GRID_MIN_SIZE: number;
/**
 * The allowed Grid types which are supported by the software
 * @type {Object}
 */
export const GRID_TYPES: any;
/**
 * An Array of valid MacroAction scope values
 * @type {Array.<string>}
 */
export const MACRO_SCOPES: Array<string>;
/**
 * The allowed playback modes for an audio Playlist
 * DISABLED: The playlist does not play on its own, only individual Sound tracks played as a soundboard
 * SEQUENTIAL: The playlist plays sounds one at a time in sequence
 * SHUFFLE: The playlist plays sounds one at a time in randomized order
 * SIMULTANEOUS: The playlist plays all contained sounds at the same time
 * @type {Object}
 */
export const PLAYLIST_MODES: any;
/**
 * Encode the reasons why a package may be available or unavailable for use
 * @type {Object}
 */
export const PACKAGE_AVAILABILITY_CODES: any;
/**
 * A safe password string which can be displayed
 */
export const PASSWORD_SAFE_STRING: string;
/**
 * The allowed software update channels
 * @type {Object}
 */
export const SOFTWARE_UPDATE_CHANNELS: any;
/**
 * The default sorting density for manually ordering child objects within a parent
 * @type {Number}
 */
export const SORT_INTEGER_DENSITY: number;
/**
 * The allowed types of a TableResult document
 * @type {Object}
 */
export const TABLE_RESULT_TYPES: any;
/**
 * Define the valid anchor locations for a Tooltip displayed on a Placeable Object
 * @type {Object}
 */
export const TEXT_ANCHOR_POINTS: any;
/**
 * Describe the various thresholds of token control upon which to show certain pieces of information
 * NONE - no information is displayed
 * CONTROL - displayed when the token is controlled
 * OWNER HOVER - displayed when hovered by a GM or a user who owns the actor
 * HOVER - displayed when hovered by any user
 * OWNER - always displayed for a GM or for a user who owns the actor
 * ALWAYS - always displayed for everyone
 * @type {Object}
 */
export const TOKEN_DISPLAY_MODES: any;
export namespace TOKEN_DISPOSITIONS {
    const HOSTILE: number;
    const NEUTRAL: number;
    const FRIENDLY: number;
}
/**
 * Define the named actions which users or user roles can be permitted to do.
 * Each key of this Object denotes an action for which permission may be granted (true) or withheld (false)
 * @type {Object}
 */
export const USER_PERMISSIONS: any;
/**
 * Define the allowed User permission levels.
 * Each level is assigned a value in ascending order. Higher levels grant more permissions.
 * @type {Object}
 */
export const USER_ROLES: any;
/**
 * Invert the User Role mapping to recover role names from a role integer
 * @type {Object}
 */
export const USER_ROLE_NAMES: any;
/**
 * The types of sensory collision which a Wall may impose
 * NONE: Senses do not collide with this wall
 * NORMAL: Senses collide with this wall
 * LIMITED: Senses collide with the second intersection, bypassing the first
 * @type {Object}
 */
export const WALL_SENSE_TYPES: any;
/**
 * The types of movement collision which a Wall may impose
 * NONE: Movement does not collide with this wall
 * NORMAL: Movement collides with this wall
 * @type {Object}
 */
export const WALL_MOVEMENT_TYPES: any;
/**
 * The allowed door states which may describe a Wall that contains a door
 * CLOSED: The door is closed
 * OPEN: The door is open
 * LOCKED: The door is closed and locked
 * @type {Object}
 */
export const WALL_DOOR_STATES: any;
/**
 * The allowed directions of effect that a Wall can have
 * BOTH: The wall collides from both directions
 * LEFT: The wall collides only when a ray strikes its left side
 * RIGHT: The wall collides only when a ray strikes its right side
 * @type {Object}
 */
export const WALL_DIRECTIONS: any;
/**
 * The allowed door types which a Wall may contain
 * NONE: The wall does not contain a door
 * DOOR: The wall contains a regular door
 * SECRET: The wall contains a secret door
 * @type {Object}
 */
export const WALL_DOOR_TYPES: any;
/**
 * The allowed set of HTML template extensions
 * @type {string[]}
 */
export const HTML_FILE_EXTENSIONS: string[];
/**
 * The supported file extensions for image-type files
 * @type {Array}
 */
export const IMAGE_FILE_EXTENSIONS: any[];
/**
 * The supported file extensions for video-type files
 * @type {Array}
 */
export const VIDEO_FILE_EXTENSIONS: any[];
/**
 * The supported file extensions for audio-type files
 * @type {Array}
 */
export const AUDIO_FILE_EXTENSIONS: any[];
declare class Array<T> {
    [n: number]: T;
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: T_2[]);
    length: number;
    toString(): string;
    toLocaleString(): string;
    pop(): T;
    push(...items: T[]): number;
    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (T | ConcatArray<T>)[]): T[];
    join(separator?: string): string;
    reverse(): T[];
    shift(): T;
    slice(start?: number, end?: number): T[];
    sort(compareFn?: (a: T, b: T) => number): T[];
    splice(start: number, deleteCount?: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    unshift(...items: T[]): number;
    indexOf(searchElement: T, fromIndex?: number): number;
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    filter<S_1 extends T>(predicate: (value: T, index: number, array: T[]) => value is S_1, thisArg?: any): S_1[];
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: T, currentIndex: number, array: T[]) => U_1, initialValue: U_1): U_1;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: T, currentIndex: number, array: T[]) => U_2, initialValue: U_2): U_2;
    find<S_2 extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S_2, thisArg?: any): S_2;
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T;
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
    fill(value: T, start?: number, end?: number): T[];
    copyWithin(target: number, start: number, end?: number): T[];
    [Symbol.iterator](): IterableIterator<T>;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
    includes(searchElement: T, fromIndex?: number): boolean;
    flatMap<U_3, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
    flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
    deepFlatten(): any;
    equals(other: any[]): boolean;
    partition(rule: Function): any[];
    filterJoin(sep: string): string;
    findSplice(find: Function): any | null;
}
interface Array<T> {
    [n: number]: T;
    length: number;
    toString(): string;
    toLocaleString(): string;
    pop(): T;
    push(...items: T[]): number;
    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (T | ConcatArray<T>)[]): T[];
    join(separator?: string): string;
    reverse(): T[];
    shift(): T;
    slice(start?: number, end?: number): T[];
    sort(compareFn?: (a: T, b: T) => number): T[];
    splice(start: number, deleteCount?: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    unshift(...items: T[]): number;
    indexOf(searchElement: T, fromIndex?: number): number;
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    filter<S_1 extends T>(predicate: (value: T, index: number, array: T[]) => value is S_1, thisArg?: any): S_1[];
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: T, currentIndex: number, array: T[]) => U_1, initialValue: U_1): U_1;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: T, currentIndex: number, array: T[]) => U_2, initialValue: U_2): U_2;
    find<S_2 extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S_2, thisArg?: any): S_2;
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T;
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
    fill(value: T, start?: number, end?: number): T[];
    copyWithin(target: number, start: number, end?: number): T[];
    [Symbol.iterator](): IterableIterator<T>;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
    includes(searchElement: T, fromIndex?: number): boolean;
    flatMap<U_3, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
    flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
    deepFlatten(): any;
    equals(other: any[]): boolean;
    partition(rule: Function): any[];
    filterJoin(sep: string): string;
    findSplice(find: Function): any | null;
}
