export = CONST;
/**
 * ~K                          An object key
 */
export type getProperty = string;
/**
 * ~K                          An object key
 */
export type setProperty = string;
/**
 * A single point, expressed as an object {x, y}
 */
export type Point = any;
/**
 * A single point, expressed as an array [x,y]
 */
export type PointArray = number[];
/**
 * A Ray intersection point
 */
export type RayIntersection = {
    x: number;
    y: number;
    t0: number;
    t1: number;
};
/**
 * A standard rectangle interface.
 */
export type Rectangle = any;
/**
 * The expected structure for a Data record
 */
export type Data = {
    [x: string]: any;
};
/**
 * An object of optional keys and values which configure the behavior of a function
 */
export type Options = {
    [x: string]: any;
};
/**
 * ~K
 */
export type Collection = any;
export type SceneControlTool = {
    name: string;
    label: string;
    icon: string;
};
export type SceneControl = {
    name: string;
    title: string;
    layer: string;
    icon: string;
    tools: SceneControlTool[];
};
export type Combatant = {
    token: Token | null;
    actor: Actor | null;
    name: string;
    players: User[];
    owner: boolean;
    visible: boolean;
};
/**
 * An Active Effect instance within a parent Actor or Item.
 */
export type ActiveEffectChange = {
    key: string;
    value: any;
    mode: number;
    priority: number;
};
export type QuadtreeObject = {
    r: Rectangle;
    t: any;
    n: Set<Quadtree>;
};
/**
 * A Token is an implementation of PlaceableObject which represents an Actor within a viewed Scene on the game canvas.
 * @extends  {PlaceableObject}
 *
 * @example
 * Token.create({
 *   name: "Token Name",
 *   x: 1000,
 *   y: 1000,
 *   displayName: 3,
 *   img: "path/to/token-artwork.png",
 *   width: 2,
 *   height: 2,
 *   scale: 1.2,
 *   elevation: 50,
 *   lockRotation: false,
 *   rotation: 30,
 *   effects: ["icons/stun.png"],
 *   overlayEffect: "icons/dead.png",
 *   vision: true,
 *   dimSight: 60,
 *   brightSight: 0,
 *   dimLight: 40,
 *   brightLight: 20,
 *   sightAngle: 60,
 *   hidden: false,
 *   actorId: "dfgkjt43jkvdfkj34t",
 *   actorLink: true,
 *   actorData: {},
 *   disposition: 1,
 *   displayBars: 3,
 *   bar1: {attribute: "attributes.hp"},
 *   bar2: {attribute: "attributes.sp"}
 * }
 */
declare class Token extends PlaceableObject {
    constructor(...args: any[]);
    /**
     * A Ray which represents the Token's current movement path
     * @type {Ray}
     * @private
     */
    private _movement;
    /**
     * An Object which records the Token's prior velocity dx and dy
     * This can be used to determine which direction a Token was previously moving
     * @type {Object}
     * @private
     */
    private _velocity;
    /**
     * The Token's most recent valid position
     * @type {Object}
     * @private
     */
    private _validPosition;
    /**
     * Provide a temporary flag through which th6is Token can be overridden to bypass any movement animation
     * @type {boolean}
     */
    _noAnimate: boolean;
    /**
     * Track the set of User entities which are currently targeting this Token
     * @type {Set.<User>}
     */
    targeted: Set<User>;
    /**
     * An Actor entity constructed using this Token's data
     * If actorLink is true, then the entity is the true Actor entity
     * Otherwise, the Actor entity is a synthetic, constructed using the Token actorData
     * @type {Actor}
     */
    actor: Actor;
    /**
     * A reference to the PointSource object which defines this light source area of effect
     * @type {PointSource}
     */
    light: PointSource;
    /**
     * A Boolean flag for whether the current game User has permission to control this token
     * @type {boolean}
     */
    get owner(): boolean;
    /**
     * A boolean flag for whether the current game User has observer permission for the Token
     * @type {boolean}
     */
    get observer(): boolean;
    /**
     * Is the HUD display active for this token?
     * @return {boolean}
     */
    get hasActiveHUD(): boolean;
    /**
     * Convenience access to the token's nameplate string
     * @type {string}
     */
    get name(): string;
    /**
     * Translate the token's grid width into a pixel width based on the canvas size
     * @type {number}
     */
    get w(): number;
    /**
     * Translate the token's grid height into a pixel height based on the canvas size
     * @type {number}
     */
    get h(): number;
    /**
     * An indicator for whether or not this token is currently involved in the active combat encounter.
     * @type {boolean}
     */
    get inCombat(): boolean;
    /**
     * An indicator for whether the Token is currently targeted by the active game User
     * @type {boolean}
     */
    get isTargeted(): boolean;
    /**
     * Determine whether the Token is visible to the calling user's perspective.
     * Hidden Tokens are only displayed to GM Users.
     * Non-hidden Tokens are always visible if Token Vision is not required.
     * Controlled tokens are always visible.
     * All Tokens are visible to a GM user if no Token is controlled.
     *
     * @see {SightLayer#testVisibility}
     * @type {boolean}
     */
    get isVisible(): boolean;
    /**
     * Test whether the Token has sight (or blindness) at any radius
     * @type {boolean}
     */
    get hasSight(): boolean;
    /**
     * Test whether the Token emits light (or darkness) at any radius
     * @type {boolean}
     */
    get emitsLight(): boolean;
    /**
     * Test whether the Token has a limited angle of vision or light emission which would require sight to update on Token rotation
     * @type {boolean}
     */
    get hasLimitedVisionAngle(): boolean;
    /**
     * Translate the token's sight distance in units into a radius in pixels.
     * @return {number}     The sight radius in pixels
     */
    get dimRadius(): number;
    /**
     * The radius of dim light that the Token emits
     * @return {number}
     */
    get dimLightRadius(): number;
    /**
     * Translate the token's bright light distance in units into a radius in pixels.
     * @return {number}       The bright radius in pixels
     */
    get brightRadius(): number;
    /**
     * The named identified for the source object associated with this Token
     * @return {string}
     */
    get sourceId(): string;
    /**
     * Update the light and vision source objects associated with this Token
     * @param {Object} [options]                  Options for updating the l
     * @param {boolean} [options.defer]           Defer refreshing the SightLayer to manually call that refresh later.
     * @param {boolean} [options.deleted]         Indicate that this light source has been deleted.
     * @param {boolean} [options.noUpdateFog]     Never update the Fog exploration progress for this update.
     */
    updateSource({ defer, deleted, noUpdateFog }?: {
        defer: boolean;
        deleted: boolean;
        noUpdateFog: boolean;
    }): void;
    /**
     * Test whether this Token is a viable vision source for the current User
     * @return {boolean}
     * @private
     */
    private _isVisionSource;
    visible: any;
    texture: any;
    border: any;
    icon: any;
    bars: any;
    nameplate: any;
    tooltip: any;
    effects: any;
    target: any;
    hitArea: any;
    buttonMode: boolean;
    /**
     * Draw resource bars for the Token
     * @private
     */
    private _drawAttributeBars;
    /**
     * Draw the Sprite icon for the Token
     * @return {Promise}
     * @private
     */
    private _drawIcon;
    /**
     * Draw the Token border, taking into consideration the grid type and border color
     * @private
     */
    private _refreshBorder;
    /**
     * Get the hex color that should be used to render the Token border
     * @return {*}
     * @private
     */
    private _getBorderColor;
    /**
     * Refresh the target indicators for the Token.
     * Draw both target arrows for the primary User as well as indicator pips for other Users targeting the same Token.
     * @private
     */
    private _refreshTarget;
    /**
     * A helper method to retrieve the underlying data behind one of the Token's attribute bars
       * @param {string} barName                The named bar to retrieve the attribute for
       * @param {Object} [options]              Options for the bar attribute.
       * @param {string} [options.alternative]  An alternative attribute path to get instead of the default one
       * @return {Object|null}                  The attribute displayed on the Token bar, if any
     */
    getBarAttribute(barName: string, { alternative }?: {
        alternative: string;
    }): any | null;
    /**
     * Refresh the display of Token attribute bars, rendering latest resource data
     * If the bar attribute is valid (has a value and max), draw the bar. Otherwise hide it.
     * @private
     */
    private drawBars;
    /**
     * Draw a single resource bar, given provided data
     * @param {number} number       The Bar number
     * @param {PIXI.Graphics} bar   The Bar container
     * @param {Object} data         Resource data for this bar
     * @private
     */
    private _drawBar;
    /**
     * Draw the token's nameplate as a text object
     * @return {PIXI.Text}  The Text object for the Token nameplate
     */
    _drawNameplate(): any;
    /**
     * Draw a text tooltip for the token which can be used to display Elevation or a resource value
     */
    drawTooltip(): void;
    /**
     * Return the text which should be displayed in a token's tooltip field
     * @return {string}
     * @private
     */
    private _getTooltipText;
    _getTextStyle(): any;
    /**
     * Draw the active effects and overlay effect icons which are present upon the Token
     */
    drawEffects(): Promise<void>;
    _drawEffect(src: any, i: any, bg: any, w: any, tint: any): Promise<void>;
    /**
     * Helper method to determine whether a token attribute is viewable under a certain mode
     * @param {number} mode   The mode from CONST.TOKEN_DISPLAY_MODES
     * @return {boolean}      Is the attribute viewable?
     * @private
     */
    private _canViewMode;
    /**
     * Animate Token movement along a certain path which is defined by a Ray object
     * @param {Ray} ray   The path along which to animate Token movement
     */
    animateMovement(ray: Ray): Promise<void>;
    /**
     * Animate the continual revealing of Token vision during a movement animation
     * @private
     */
    private _onMovementFrame;
    /**
     * Terminate animation of this particular Token
     */
    stopAnimation(): void;
    /**
     * Check for collision when attempting a move to a new position
     * @param {Point} destination   The destination point of the attempted movement
     * @return {boolean}            A true/false indicator for whether the attempted movement caused a collision
     */
    checkCollision(destination: Point): boolean;
    /**
     * Get the center-point coordinate for a given grid position
     * @param {number} x    The grid x-coordinate that represents the top-left of the Token
     * @param {number} y    The grid y-coordinate that represents the top-left of the Token
     * @return {Object}     The coordinate pair which represents the Token's center at position (x, y)
     */
    getCenter(x: number, y: number): any;
    /**
     * Set the token's position by comparing its center position vs the nearest grid vertex
     * Return a Promise that resolves to the Token once the animation for the movement has been completed
     * @param {number} x                    The x-coordinate of the token center
     * @param {number} y                    The y-coordinate of the token center
     * @param {Object} [options]            The options to set the position.
     * @param {boolean} [options.animate]   Animate the movement path, default is true
     * @return {Promise}                    The Token after animation has completed
     */
    setPosition(x: number, y: number, { animate }?: {
        animate: boolean;
    }): Promise<any>;
    /**
     * Update the Token velocity auto-regressively, shifting increasing weight towards more recent movement
     * Employ a magic constant chosen to minimize (effectively zero) the likelihood of trigonometric edge cases
     * @param {Ray} ray     The proposed movement ray
     * @return {Object}     An updated velocity with directional memory
     * @private
     */
    private _updateVelocity;
    /**
     * Set this Token as an active target for the current game User
       * @param {boolean} targeted                  Is the Token now targeted?
       * @param {Object} [options]                  The options for setting the Token's target.
       * @param {User|null} [options.user]          Assign the token as a target for a specific User
       * @param {boolean} [options.releaseOthers]   Release other active targets for the same player?
       * @param {boolean} [options.groupSelection]  Is this target being set as part of a group selection workflow?
     */
    setTarget(targeted?: boolean, { user, releaseOthers, groupSelection }?: {
        user: User | null;
        releaseOthers: boolean;
        groupSelection: boolean;
    }): void;
    /**
     * Add or remove the currently controlled Tokens from the active combat encounter
     * @param {Combat} [combat]    A specific combat encounter to which this Token should be added
     * @return {Promise<Token>} The Token which initiated the toggle
     */
    toggleCombat(combat?: Combat): Promise<Token>;
    /**
     * Toggle an active effect by it's texture path.
     * Copy the existing Array in order to ensure the update method detects the data as changed.
     *
     * @param {string} texture      The texture file-path of the effect icon to toggle on the Token.
     * @return {Promise<boolean>}   Was the texture applied (true) or removed (false)
     */
    toggleEffect(texture: string): Promise<boolean>;
    /**
     * Set or remove the overlay texture for the Token by providing a new texture path
     * @param {string} texture      The texture file-path of the effect to set as the Token overlay icon
     * @return {Promise<boolean>}   Was the texture applied (true) or removed (false)
     */
    toggleOverlay(texture: string): Promise<boolean>;
    /**
     * Toggle the visibility state of any Tokens in the currently selected set
     * @return {Promise}
     */
    toggleVisibility(): Promise<any>;
    /**
     * Return the token's sight origin, tailored for the direction of their movement velocity to break ties with walls
     * @return {Object}
     */
    getSightOrigin(): any;
    /**
     * A generic transformation to turn a certain number of grid units into a radius in canvas pixels.
     * This function adds additional padding to the light radius equal to half the token width.
     * This causes light to be measured from the outer token edge, rather than from the center-point.
     * @param units {number}  The radius in grid units
     * @return {number}       The radius in canvas units
     */
    getLightRadius(units: number): number;
    /**
     * Perform an incremental token movement, shifting the token's position by some number of grid units.
     * The offset parameters will move the token by that number of grid spaces in one or both directions.
     *
     * @param {number} dx         The number of grid units to shift along the X-axis
     * @param {number} dy         The number of grid units to shift along the Y-axis
     * @return {Promise}
     */
    shiftPosition(dx: number, dy: number): Promise<any>;
    /**
     * Handle updates to the Token's referenced Actor (either Entity or synthetic)
     * @param {Object} updateData     The changes to Token actorData overrides which are incremental
     * @private
     */
    private _onUpdateTokenActor;
    /**
     * Handle updates to this Token which originate from changes to the base Actor entity
     * @param {Object} actorData     Updated data for the base Actor
     * @param {Object} updateData    Changes to the base Actor which were incremental
     * @private
     */
    private _onUpdateBaseActor;
    /**
     * Handle the possible re-drawing of Token attribute bars depending on whether the tracked attribute changed
     * @param {Object} updateData     An object of changed data
     * @private
     */
    private _onUpdateBarAttributes;
}
/**
 * The Actor Entity which represents the protagonists, characters, enemies, and more that inhabit and take actions
 * within the World.
 * @extends {Entity}
 *
 * @see {@link Actors} Each Actor belongs to the Actors collection.
 * @see {@link ActorSheet} Each Actor is edited using the ActorSheet application or a subclass thereof.
 * @see {@link ActorDirectory} All Actors which exist in the world are rendered within the ActorDirectory sidebar tab.
 *
 *
 * @example <caption>Create a new Actor</caption>
 * let actor = await Actor.create({
 *   name: "New Test Actor",
 *   type: "character",
 *   img: "artwork/character-profile.jpg",
 *   folder: folder.data._id,
 *   sort: 12000,
 *   data: {},
 *   token: {},
 *   items: [],
 *   flags: {}
 * });
 *
 * @example <caption>Retrieve an existing Actor</caption>
 * let actor = game.actors.get(actorId);
 */
declare class Actor extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof Actor;
        collection: any;
        embeddedEntities: {
            ActiveEffect: string;
            OwnedItem: string;
        };
        label: string;
        permissions: {
            create: string;
        };
    };
    /**
     * Create a synthetic Actor using a provided Token instance
     * If the Token data is linked, return the true Actor entity
     * If the Token data is not linked, create a synthetic Actor using the Token's actorData override
     * @param {Token} token
     * @return {Actor}
     */
    static fromToken(token: Token): Actor;
    /**
     * Create a synthetic Token Actor instance which is used in place of an actual Actor.
     * Cache the result in Actors.tokens.
     * @param {Actor} baseActor
     * @param {Token} token
     * @return {Actor}
     */
    static createTokenActor(baseActor: Actor, token: Token): Actor;
    constructor(...args: any[]);
    /**
     * A reference to a placed Token which creates a synthetic Actor
     * @type {Token}
     */
    token: Token;
    /**
     * Construct the Array of Item instances for the Actor
     * Items are prepared by the Actor.prepareEmbeddedEntities() method
     * @type {Collection<string,OwnedItem>}
     */
    items: any;
    /**
     * A set that tracks which keys in the data model were modified by active effects
     * @type {Data}
     */
    overrides: Data;
    /**
     * Cache an Array of allowed Token images if using a wildcard path
     * @type {string[]}
     * @private
     */
    private _tokenImages;
    /**
     * A convenient reference to the file path of the Actor's profile image
     * @type {string}
     */
    get img(): string;
    /**
     * Classify Owned Items by their type
     * @type {Object<string,Array>}
     */
    get itemTypes(): {
        [x: string]: any[];
    };
    /**
     * Test whether an Actor entity is a synthetic representation of a Token (if true) or a full Entity (if false)
     * @type {boolean}
     */
    get isToken(): boolean;
    /**
     * An array of ActiveEffect instances which are present on the Actor which have a limited duration.
     * @return {ActiveEffect[]}
     */
    get temporaryEffects(): ActiveEffect[];
    /**
     * First prepare any derived data which is actor-specific and does not depend on Items or Active Effects
     */
    prepareBaseData(): void;
    /**
     * Apply final transformations to the Actor data after all effects have been applied
     */
    prepareDerivedData(): void;
    effects: Collection;
    /**
     * Prepare a Collection of OwnedItem instances which belong to this Actor.
     * @param {object[]} items        The raw array of item objects
     * @return {Collection}           The owned items collection
     * @private
     */
    private _prepareOwnedItems;
    /**
     * Prepare a Collection of ActiveEffect instances which belong to this Actor.
     * @param {object[]} effects      The raw array of active effect objects
     * @return {Collection}           The active effects collection
     * @private
     */
    private _prepareActiveEffects;
    /**
     * Apply any transformations to the Actor data which are caused by ActiveEffects.
     */
    applyActiveEffects(): void;
    /**
     * Retrieve an Array of active tokens which represent this Actor in the current canvas Scene.
     * If the canvas is not currently active, or there are no linked actors, the returned Array will be empty.
     *
     * @param [linked] {boolean}  Only return tokens which are linked to the Actor. Default (false) is to return all
     *                            tokens even those which are not linked.
     *
     * @return {Token[]}          An array of tokens in the current Scene which reference this Actor.
     */
    getActiveTokens(linked?: boolean): Token[];
    /**
     * Prepare a data object which defines the data schema used by dice roll commands against this Actor
     * @return {Object}
     */
    getRollData(): any;
    /**
     * Get an Array of Token images which could represent this Actor
     * @return {Promise}
     */
    getTokenImages(): Promise<any>;
    /**
     * Handle how changes to a Token attribute bar are applied to the Actor.
     * This allows for game systems to override this behavior and deploy special logic.
     * @param {string} attribute    The attribute path
     * @param {number} value        The target attribute value
     * @param {boolean} isDelta     Whether the number represents a relative change (true) or an absolute change (false)
     * @param {boolean} isBar       Whether the new value is part of an attribute bar, or just a direct value
     * @return {Promise}
     */
    modifyTokenAttribute(attribute: string, value: number, isDelta?: boolean, isBar?: boolean): Promise<any>;
    /**
     * When Owned Items are created process each item and extract Active Effects to transfer to the Actor.
     * @param {Data[]} created        Created OwnedItem data objects
     * @param {boolean} [temporary]   Is this a temporary item creation?
     * @return {Data[]}               An array of effects to transfer to the Actor
     * @private
     */
    private _createItemActiveEffects;
    /**
     * When Owned Items are created process each item and extract Active Effects to transfer to the Actor.
     * @param {Data[]} deleted   The array of deleted OwnedItem data
     * @private
     */
    private _deleteItemActiveEffects;
    /**
     * Get an Item instance corresponding to the Owned Item with a given id
     * @param {string} itemId   The OwnedItem id to retrieve
     * @return {Item}           An Item instance representing the Owned Item within the Actor entity
     */
    getOwnedItem(itemId: string): Item;
    /**
     * Create a new item owned by this Actor. This redirects its arguments to the createEmbeddedEntity method.
     * @see {Entity#createEmbeddedEntity}
     *
     * @param {Object} itemData     Data for the newly owned item
     * @param {Object} options      Item creation options
     * @param {boolean} options.renderSheet Render the Item sheet for the newly created item data
     * @return {Promise.<Object>}   A Promise resolving to the created Owned Item data
     */
    createOwnedItem(itemData: any, options?: {
        renderSheet: boolean;
    }): Promise<any>;
    /**
     * Update an owned item using provided new data. This redirects its arguments to the updateEmbeddedEntity method.
     * @see {Entity#updateEmbeddedEntity}
     *
     * @param {Object} itemData     Data for the item to update
     * @param {Object} options      Item update options
     * @return {Promise.<Object>}   A Promise resolving to the updated Owned Item data
     */
    updateOwnedItem(itemData: any, options?: any): Promise<any>;
    /**
     * Delete an owned item by its id. This redirects its arguments to the deleteEmbeddedEntity method.
     * @see {Entity#deleteEmbeddedEntity}
     *
     * @param {string} itemId       The ID of the item to delete
     * @param {Object} options      Item deletion options
     * @return {Promise.<Object>}   A Promise resolving to the deleted Owned Item data
     */
    deleteOwnedItem(itemId: string, options?: any): Promise<any>;
    /**
     * @deprecated since 0.7.0
     */
    importItemFromCollection(collection: any, entryId: any): any;
    /**
     * @deprecated since 0.7.2
     * @see {@link Entity#hasPlayerOwner}
     */
    get isPC(): boolean;
}
/**
 * The User entity
 * Each player who connects to a Foundry Virtual Tabletop session is a User.
 * Users represent human beings (or possibly programmatic players) and are the cornerstone of identity in Foundry VTT.
 * @type {Entity}
 *
 * @param {Object} data           The source data for the User entity, usually retrieved from the database.
 * @param {string} data._id       The Entity ID, automatically generated by the Database when a new User is created.
 * @param {string} data.password  An access key for the Entity.
 * @param {number} data.role      The role level for the User, from CONST.USER_ROLES
 * @param {Object} data.permissions  An object of key-value permissions for the User which extend the default functionality
                                  of the User's role.
 * @param {string} data.avatar    A web-accessible file path to an avatar image used to represent the User.
 * @param {string} data.character The _id of the Actor entity that the User has chosen as their primary character.
 * @param {string} data.color     A color string which represents the visual color associated with this particular User.
 * @param {Object} data.flags     A free-form object of key-value pairs which allows modules and systems the ability
                                  to store arbitrary data as part of the User object.
 * @param {Object} options        Initialization options which modify the construction of a User entity. See the Entity
                                  class for more detail.
 */
declare class User extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof User;
        collection: any;
        embeddedEntities: {};
        label: string;
    };
    constructor(data: any, options: any);
    /**
     * Track whether the user is currently active in the game
     * @type {boolean}
     */
    active: boolean;
    /**
     * Track references to the current set of Tokens which are targeted by the User
     * @type {Set.<Token>}
     */
    targets: Set<Token>;
    /**
     * Track the ID of the Scene that is currently being viewed by the User
     * @type {string|null}
     */
    viewedScene: any;
    /**
     * Return the User avatar icon or the controlled actor's image
     * @type {string}
     */
    get avatar(): string;
    /**
     * Return the Actor instance of the user's impersonated character (or undefined)
     * @type {Actor}
     */
    get character(): Actor;
    /**
     * A convenience shortcut for the permissions object of the current User
     * @type {Object}
     */
    get permissions(): any;
    /**
     * A flag for whether the current User is a Trusted Player
     * @return {boolean}
     */
    get isTrusted(): boolean;
    /**
     * A flag for whether the current User has Assistant GameMaster or full GameMaster role
     * @return {boolean}
     */
    get isGM(): boolean;
    /**
     * A flag for whether this User is the connected client
     * @return {boolean}
     */
    get isSelf(): boolean;
    /**
     * Test whether the User has a specific permission entitled .This differs from user#can because it does not always
     * return true for Game Master users and should be used in cases where a permission could be withheld even from
     * a GM player (for example cursor display, or A/V audio).
     *
     * @param {string} permission     The action to test
     * @return {boolean}              Does the user have explicit permission to perform this action?
     */
    hasPermission(permission: string): boolean;
    /**
     * Test whether the User has at least the permission level of a certain role
     * @param {string|number} role     The role name from USER_ROLES to test
     * @return {boolean}               Does the user have at least this role level?
     */
    hasRole(role: string | number): boolean;
    /**
     * Test whether the User has exactly the permission level of a certain role
     * @param {string|number} role     The role name from USER_ROLES to test
     * @return {boolean}               Does the user have exactly this role level?
     */
    isRole(role: string | number): boolean;
    /**
     * Sets a user's permission
     * Modifies the user permissions to grant or restrict access to a feature.
     *
     * @param {string} permission    The permission name from USER_PERMISSIONS
     * @param {boolean} allowed      Whether to allow or restrict the permission
     */
    setPermission(permission: string, allowed: boolean): void;
    /**
     * Submit User activity data to the server for broadcast to other players.
     * This type of data is transient, persisting only for the duration of the session and not saved to any database.
     *
     * @param {Object} activityData             An object of User activity data to submit to the server for broadcast.
     * @param {Object} activityData.cursor      The coordinates of the user's cursor
     * @param {boolean} activityData.focus      Is the user pulling focus to the cursor coordinates?
     * @param {boolean} activityData.ping       Is the user emitting a ping at the cursor coordinates?
     * @param {string} activityData.ruler       Serialized Ruler coordinate data in JSON format
     * @param {string} activityData.sceneId     The id of the Scene currently being viewed by the User
     * @param {string[]} activityData.targets   An id of Token ids which are targeted by the User
     */
    broadcastActivity(activityData?: {
        cursor: any;
        focus: boolean;
        ping: boolean;
        ruler: string;
        sceneId: string;
        targets: string[];
    }): void;
    /**
     * Assign a Macro to a numbered hotbar slot between 1 and 50
       * @param {Macro|null} macro            The Macro entity to assign
       * @param {number} slot                 The integer Hotbar slot to fill
       * @param {Object} [options]            Hotbar macro options
       * @param {number} [options.fromSlot]   An optional origin slot from which the Macro is being shifted
       * @return {Promise}                    A Promise which resolves once the User update is complete
     */
    assignHotbarMacro(macro: Macro | null, slot: number, { fromSlot }?: {
        fromSlot: number;
    }): Promise<any>;
    /**
     * Get an Array of Macro Entities on this User's Hotbar by page
     * @param {number} page     The hotbar page number
     * @return {Object[]}
     */
    getHotbarMacros(page?: number): any[];
    updateTokenTargets(targetIds: any): void;
}
/**
 * @typedef {{r: Rectangle, t: any, n: Set<Quadtree>}} QuadtreeObject
 */
/**
 * A Quadtree implementation that supports collision detection for rectangles.
 *
 * @param {Rectangle}                       The outer bounds of the region
 * @param {object} options                  Additional options which configure the Quadtree
 * @param {number} options.maxObjects       The maximum number of objects per node
 * @param {number} options.maxDepth         The maximum number of levels within the root Quadtree
 * @param {number} options._depth           The depth level of the sub-tree. For internal use only
 * @param {number} options._depth           Whether this node represents the root of the tree. For internal use.
 */
declare class Quadtree {
    constructor(bounds: any, { maxObjects, maxDepth, _depth }?: {
        maxObjects?: number;
        maxDepth?: number;
        _depth?: number;
    });
    /**
     * The bounding rectangle of the region
     * @type {Rectangle}
     */
    bounds: Rectangle;
    /**
     * The maximum number of objects allowed within this node before it must split
     * @type {number}
     */
    maxObjects: number;
    /**
     * The maximum number of levels that the base quadtree is allowed
     * @type {number}
     */
    maxDepth: number;
    /**
     * The depth of this node within the root Quadtree
     * @type {number}
     */
    depth: number;
    /**
     * The objects contained at this level of the tree
     * @type {QuadtreeObject[]}
     */
    objects: {
        r: Rectangle;
        t: any;
        n: Set<Quadtree>;
    }[];
    /**
     * Children of this node
     * @type {Quadtree[]}
     */
    nodes: Quadtree[];
    /**
     * Return an array of all the objects in the Quadtree (recursive)
     * @return {QuadtreeObject[]}
     */
    get all(): {
        r: Rectangle;
        t: any;
        n: Set<Quadtree>;
    }[];
    /**
     * Clear the quadtree of all existing contents
     * @return {Quadtree}     The cleared Quadtree
     */
    clear(): Quadtree;
    /**
     * Add a rectangle object to the tree
     * @param {QuadtreeObject} obj  The object being inserted
     * @return {Quadtree[]}         The Quadtree nodes the object was added to.
     */
    insert(obj: QuadtreeObject): Quadtree[];
    /**
     * Remove an object from the quadtree
     * @param {target} target    The quadtree target being removed
     * @return {Quadtree}        The Quadtree for method chaining
     */
    remove(target: any): Quadtree;
    /**
     * Split this node into 4 sub-nodes.
     * @return {Quadtree}     The split Quadtree
     */
    split(): Quadtree;
    /**
     * Get all the objects which could collide with the provided rectangle
     * @param {Rectangle} rect  The target rectangle
     * @param {Set} _s          The existing result set, for internal use.
     * @returns {Set}           The objects in the Quadtree which represent potential collisions
     */
    getObjects(rect: Rectangle, _s: Set<any>): Set<any>;
    /**
     * Obtain the leaf nodes to which a target rectangle belongs.
     * This traverses the quadtree recursively obtaining the final nodes which have no children.
     * @param {Rectangle} rect    The target rectangle.
     * @return {Quadtree[]}       The Quadtree nodes to which the target rectangle belongs
     */
    getLeafNodes(rect: Rectangle): Quadtree[];
    /**
     * Obtain the child nodes within the current node which a rectangle belongs to.
     * Note that this function is not recursive, it only returns nodes at the current or child level.
     * @param {Rectangle} rect  The target rectangle.
     * @return {Quadtree[]}     The Quadtree nodes to which the target rectangle belongs
     */
    getChildNodes(rect: Rectangle): Quadtree[];
    /**
     * Visualize the nodes and objects in the quadtree
       * @param {Object} [options]            The options to visualize the Quadtree.
       * @param {boolean} [options.objects]   Visualize the rectangular bounds of objects in the Quadtree. Default is false.
     */
    visualize({ objects }?: {
        objects?: boolean;
    }): void;
}
declare namespace Quadtree {
    const INDICES: {
        br: number;
        tl: number;
        bl: number;
        tr: number;
    };
}
/**
 * An Abstract Base Class which defines a Placeable Object which represents an Entity placed on the Canvas
 * @extends {PIXI.Container}
 * @abstract
 * @interface
 */
declare class PlaceableObject {
    /**
     * Identify the official EmbeddedEntity name for this PlaceableObject class
     * @type {string}
     */
    static get embeddedName(): string;
    /**
     * Provide a reference to the canvas layer which contains placeable objects of this type
     * @type {PlaceablesLayer}
     */
    static get layer(): PlaceablesLayer;
    /** @extends {Entity.createEmbeddedEntity} */
    static create(data: any, options: any): Promise<PlaceableObject | PlaceableObject[]>;
    constructor(data: any, scene: any);
    /**
     * The underlying data object which provides the basis for this placeable object
     * @type {Object}
     */
    data: any;
    /**
     * Retain a reference to the Scene within which this Placeable Object resides
     * @type {Scene}
     */
    scene: Scene;
    /**
     * Track the field of vision for the placeable object.
     * This is necessary to determine whether a player has line-of-sight towards a placeable object or vice-versa
     * @type {{fov: PIXI.Polygon|null, los: PIXI.Polygon|null}}
     */
    vision: {
        fov: any | null;
        los: any | null;
    };
    /**
     * A control icon for interacting with the object
     * @type {ControlIcon}
     */
    controlIcon: ControlIcon;
    /**
     * A mouse interaction manager instance which handles mouse workflows related to this object.
     * @type {MouseInteractionManager}
     */
    mouseInteractionManager: MouseInteractionManager;
    /**
     * An indicator for whether the object is currently controlled
     * @type {boolean}
     * @private
     */
    private _controlled;
    /**
     * An indicator for whether the object is currently a hover target
     * @type {boolean}
     * @private
     */
    private _hover;
    /**
     * A singleton reference to the FormApplication class which configures this object
     * @type {FormApplication|null}
     * @private
     */
    private _sheet;
    /**
     * The bounding box for this PlaceableObject.
     * This is required if the layer uses a Quadtree, otherwise it is optional
     * @return {NormalizedRectangle}
     */
    get bounds(): NormalizedRectangle;
    /**
     * The central coordinate pair of the placeable object based on it's own width and height
     * @type {PIXI.Point}
     */
    get center(): any;
    /**
     * The _id of the underlying EmbeddedEntity
     * @type {string}
     */
    get id(): string;
    /**
     * The field-of-vision polygon for the object, if it has been computed
     * @type {PIXI.Polygon|null}
     */
    get fov(): any;
    /** @alias {PlaceableObject.layer} */
    get layer(): any;
    /**
     * The line-of-sight polygon for the object, if it has been computed
     * @type {PIXI.Polygon|null}
     */
    get los(): any;
    /**
     * A Form Application which is used to configure the properties of this Placeable Object or the EmbeddedEntity
     * it represents.
     * @type {FormApplication}
     */
    get sheet(): FormApplication;
    /**
     * A Universally Unique Identifier (uuid) for this EmbeddedEntity
     * @type {string}
     */
    get uuid(): string;
    /**
     * Test whether a user can perform a certain interaction with regards to a Placeable Object
     * @param {User} user       The User performing the action
     * @param {string} action   The named action being attempted
     * @return {boolean}        Does the User have rights to perform the action?
     */
    can(user: User, action: string): boolean;
    /**
     * Can the User access the HUD for this Placeable Object?
     * @private
     */
    private _canHUD;
    /**
     * Does the User have permission to configure the Placeable Object?
     * @private
     */
    private _canConfigure;
    /**
     * Does the User have permission to control the Placeable Object?
     * @private
     */
    private _canControl;
    /**
     * Does the User have permission to view details of the Placeable Object?
     * @private
     */
    private _canView;
    /**
     * Does the User have permission to create the underlying Embedded Entity?
     * @private
     */
    private _canCreate;
    /**
     * Does the User have permission to drag this Placeable Object?
     * @private
     */
    private _canDrag;
    /**
     * Does the User have permission to hover on this Placeable Object?
     * @private
     */
    private _canHover;
    /**
     * Does the User have permission to update the underlying Embedded Entity?
     * @private
     */
    private _canUpdate;
    /**
     * Does the User have permission to delete the underlying Embedded Entity?
     * @private
     */
    private _canDelete;
    /**
     * Clear the display of the existing object
     * @return {PlaceableObject}    The cleared object
     */
    clear(): PlaceableObject;
    /**
     * Clone the placeable object, returning a new object with identical attributes
     * The returned object is non-interactive, and has no assigned ID
     * If you plan to use it permanently you should call the create method
     *
     * @return {PlaceableObject}  A new object with identical data
     */
    clone(): PlaceableObject;
    /**
     * Draw the placeable object into its parent container
     * @return {Promise.<PlaceableObject>}    The drawn object
     */
    draw(): Promise<PlaceableObject>;
    /**
     * Draw the primary Sprite for the PlaceableObject
     * @return {PIXI.Sprite|null}
     * @private
     */
    private _drawPrimarySprite;
    /**
     * Refresh the current display state of the Placeable Object
     * @return {PlaceableObject}    The refreshed object
     */
    refresh(): PlaceableObject;
    /** @extends {Entity.updateEmbeddedEntity} */
    update(data: any, options: any): Promise<PlaceableObject>;
    /** @extends {Entity.deleteEmbeddedEntity} */
    delete(options: any): Promise<PlaceableObject>;
    /**
     * Get the value of a "flag" for this PlaceableObject
     * See the setFlag method for more details on flags
     *
     * @param {string} scope    The flag scope which namespaces the key
     * @param {string} key      The flag key
     * @return {*}              The flag value
     */
    getFlag(scope: string, key: string): any;
    /**
     * Assign a "flag" to this Entity.
     * Flags represent key-value type data which can be used to store flexible or arbitrary data required by either
     * the core software, game systems, or user-created modules.
     *
     * Each flag should be set using a scope which provides a namespace for the flag to help prevent collisions.
     *
     * Flags set by the core software use the "core" scope.
     * Flags set by game systems or modules should use the canonical name attribute for the module
     * Flags set by an individual world should "world" as the scope.
     *
     * Flag values can assume almost any data type. Setting a flag value to null will delete that flag.
     *
     * @param {string} scope    The flag scope which namespaces the key
     * @param {string} key      The flag key
     * @param {*} value         The flag value
     *
     * @return {Promise}        A Promise resolving to the updated PlaceableObject
     */
    setFlag(scope: string, key: string, value: any): Promise<any>;
    /**
     * Remove a flag assigned to the Entity
     * @param {string} scope    The flag scope which namespaces the key
     * @param {string} key      The flag key
     * @return {Promise}        A Promise resolving to the updated Entity
     */
    unsetFlag(scope: string, key: string): Promise<any>;
    /**
     * Register pending canvas operations which should occur after a new PlaceableObject of this type is created
     * @private
     */
    private _onCreate;
    /**
     * Define additional steps taken when an existing placeable object of this type is updated with new data
     * @private
     */
    private _onUpdate;
    zIndex: number;
    /**
     * Define additional steps taken when an existing placeable object of this type is deleted
     * @private
     */
    private _onDelete;
    /**
     * Assume control over a PlaceableObject, flagging it as controlled and enabling downstream behaviors
     * @param {Object} options                  Additional options which modify the control request
     * @param {boolean} options.releaseOthers   Release any other controlled objects first
     * @return {boolean}                        A flag denoting whether or not control was successful
     */
    control(options?: {
        releaseOthers: boolean;
    }): boolean;
    /**
     * Additional events which trigger once control of the object is established
     * @param {Object} options    Optional parameters which apply for specific implementations
     * @private
     */
    private _onControl;
    /**
     * Release control over a PlaceableObject, removing it from the controlled set
     * @param {Object} options          Options which modify the releasing workflow
     * @return {boolean}                A Boolean flag confirming the object was released.
     */
    release(options?: any): boolean;
    /**
     * Additional events which trigger once control of the object is released
     * @param {Object} options          Options which modify the releasing workflow
     * @private
     */
    private _onRelease;
    /**
     * Rotate the PlaceableObject to a certain angle of facing
     * @param {number} angle                  The desired angle of rotation
     * @param {number} snap                   Snap the angle of rotation to a certain target degree increment
     * @return {Promise.<PlaceableObject>}    A Promise which resolves once the rotation has completed
     */
    rotate(angle: number, snap: number): Promise<PlaceableObject>;
    /**
     * Determine a new angle of rotation for a PlaceableObject either from an explicit angle or from a delta offset.
       * @param {Object} [options]          The options to update the rotation of a PlaceableObject.
       * @param {number} [options.angle]    An explicit angle, either this or delta must be provided
       * @param {number} [options.delta]    A relative angle delta, either this or the angle must be provided
       * @param {number} [options.snap]     A precision (in degrees) to which the resulting angle should snap. Default is 0.
       * @return {number}                   The new rotation angle for the object
     */
    _updateRotation({ angle, delta, snap }?: {
        angle: number;
        delta: number;
        snap: number;
    }): number;
    /**
     * Obtain a shifted position for the Placeable Object
     * @param {number} dx         The number of grid units to shift along the X-axis
     * @param {number} dy         The number of grid units to shift along the Y-axis
     * @return {{x, y}}           The shifted target coordinates
     * @private
     */
    private _getShiftedPosition;
    /**
     * Activate interactivity for the Placeable Object
     */
    activateListeners(): void;
    /**
     * Create a standard MouseInteractionManager for the PlaceableObject
     * @private
     */
    private _createInteractionManager;
    /**
     * Actions that should be taken for this Placeable Object when a mouseover event occurs
     * @param {PIXI.interaction.InteractionEvent} event
     * @param {boolean} hoverOutOthers
     * @private
     */
    private _onHoverIn;
    /**
     * Actions that should be taken for this Placeable Object when a mouseout event occurs
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onHoverOut;
    /**
     * Callback actions which occur on a single left-click event to assume control of the object
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onClickLeft;
    /**
     * Callback actions which occur on a double left-click event to activate
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onClickLeft2;
    /**
     * Callback actions which occur on a single right-click event to configure properties of the object
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onClickRight;
    /**
     * Callback actions which occur on a double right-click event to configure properties of the object
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onClickRight2;
    /**
     * Callback actions which occur when a mouse-drag action is first begun.
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onDragLeftStart;
    /**
     * Callback actions which occur on a mouse-move operation.
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onDragLeftMove;
    /**
     * Callback actions which occur on a mouse-move operation.
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onDragLeftDrop;
    /**
     * Callback actions which occur on a mouse-move operation.
     * @param {PIXI.interaction.InteractionEvent} event
     * @private
     */
    private _onDragLeftCancel;
}
/**
 * A helper class used by the Sight Layer to represent a source of vision or illumination.
 */
declare class PointSource {
    /**
     * For testing the performance gains of culling render of off-screen sources.
     */
    static updatePointSourceBounds(): void;
    /**
     * The light or darkness container for this source
     * @type {PIXI.Container}
     */
    illumination: any;
    /**
     * This visible color container for this source
     * @type {PIXI.Container}
     */
    coloration: any;
    /**
     * Internal flag for whether this is a darkness source
     * @type {boolean}
     */
    darkness: boolean;
    /**
     * Is the light source limited by an angle of emission?
     * @type {boolean}
     */
    limited: boolean;
    /**
     * The maximum radius of emission for this source
     * @type {number}
     */
    radius: number;
    /**
     * Internal flag for animation throttling time
     * @type {number}
     */
    _animateTime: number;
    /**
     * Create the structure of a source Container which can be rendered to the sight layer shadow-map
     * @return {PIXI.Container} The constructed light source container
     * @private
     */
    private _createContainer;
    /**
     * Initialize the source with provided object data.
       * @param {Object} [options]                      The options to initialize the Point Source
       * @param {number} [options.x]                    The x-coordinate of the source location
       * @param {number} [options.y]                    The y-coordinate of the source location
       * @param {number} [options.dim]                  The allowed radius of dim vision or illumination
       * @param {number} [options.bright]               The allowed radius of bright vision or illumination
       * @param {number} [options.angle]                The angle of emission for this point source
       * @param {number} [options.rotation]             The angle of rotation for this point source
       * @param {string} [options.color]                A tint color for the emitted light, if any
       * @param {number} [options.alpha]                An opacity for the emitted light, if any
       * @param {number} [options.animation]            An animation for the point source
       * @param {number} [options.darknessThreshold]    A level of darkness beyond which this light is active
       * @param {string} [options.type]                 The source type from SOURCE_TYPES
       *
       * @return {PointSource}                          A reference to the initialized source
     */
    initialize({ x, y, dim, bright, angle, rotation, color, alpha, animation, darknessThreshold, type }?: {
        x: number;
        y: number;
        dim: number;
        bright: number;
        angle: number;
        rotation: number;
        color: string;
        alpha: number;
        animation: number;
        darknessThreshold: number;
        type: string;
    }): PointSource;
    x: number;
    y: number;
    angle: number;
    rotation: number;
    alpha: number;
    color: number;
    colorRGB: any[];
    darknessThreshold: number;
    animation: number;
    type: string;
    dim: number;
    bright: number;
    fov: any;
    los: any;
    /**
     * Draw the display of this source for the darkness/light container of the SightLayer.
     * @return {PIXI.Container}       The rendered light container
     */
    drawLight(channels: any): any;
    /**
     * Draw and return a container used to depict the visible color tint of the light source on the LightingLayer
     * @return {PIXI.Container}           An updated color container for the source
     */
    drawColor(): any;
    /**
     * Animate the PointSource, if an animation is enabled and if it currently has rendered containers.
     * @param {number} dt         Delta time
     */
    animate(dt: number): void;
    /**
     * A basic "torch" animation which flickers like a burning flame.
       * @param {number} dt                     Delta time
       * @param {Object} [options]              the options of a torch.
       * @param {number} [options.speed]        The animation speed, from 1 to 10
       * @param {number} [options.intensity]    The animation intensity, from 1 to 10
     */
    animateTorch(dt: number, { speed, intensity }?: {
        speed: number;
        intensity: number;
    }): void;
    _flickerTime: number;
    /**
     * A basic "pulse" animation which expands and contracts.
       * @param {number} dt                     Delta time
       * @param {Object} [options]              The options for the pulse
       * @param {number} [options.speed]        The animation speed, from 1 to 10
       * @param {number} [options.intensity]    The animation intensity, from 1 to 10
     */
    animatePulse(dt: number, { speed, intensity }?: {
        speed: number;
        intensity: number;
    }): void;
    _pulseAngle: any;
    /**
     * A color-shifting animation which evolves the tint color of the displayed light source.
       * @param {number} dt                     Delta time
       * @param {Object} [options]              The options
       * @param {number} [options.speed]        The animation speed, from 1 to 10
       * @param {number} [options.intensity]    The animation intensity, from 1 to 10
     */
    animateChroma(dt: number, { speed, intensity }?: {
        speed: number;
        intensity: number;
    }): void;
    _priorColor: any;
    _targetColor: number[];
    /**
     * Evolve a value using a stochastic AR(1) process
     * @param {number} y        The current value
     * @param {number} phi      The decay rate of prior values
     * @param {number} center   The stationary mean of the series
     * @param {number} sigma    The volatility of the process - standard deviation of the error term
     * @param {number} max      The maximum allowed outcome, or null
     * @param {number} min      The minimum allowed outcome, or null
     * @return {number}         The new value of the process
     * @private
     */
    private _ar1;
}
/**
 * A ray for the purposes of computing sight and collision
 * Given points A[x,y] and B[x,y]
 *
 * Slope-Intercept form:
 * y = a + bx
 * y = A.y + ((B.y - A.Y) / (B.x - A.x))x
 *
 * Parametric form:
 * R(t) = (1-t)A + tB
 *
 * @param {{x: number, y: number}} A      The origin of the Ray
 * @param {{x: number, y: number}} B      The destination of the Ray
 */
declare class Ray {
    /**
     * A factory method to construct a Ray from an origin point, an angle, and a distance
     * @param {number} x          The origin x-coordinate
     * @param {number} y          The origin y-coordinate
     * @param {number} radians    The ray angle in radians
     * @param {number} distance   The distance of the ray in pixels
     * @return {Ray}              The constructed Ray instance
     */
    static fromAngle(x: number, y: number, radians: number, distance: number): Ray;
    /**
     * A factory method to construct a Ray from points in array format.
     * @param {PointArray} A    The origin point [x,y]
     * @param {PointArray} B    The destination point [x,y]
     * @return {Ray}            The constructed Ray instance
     */
    static fromArrays(A: number[], B: number[]): Ray;
    /**
     * An internal helper method for computing the intersection between two lines.
     * @private
     */
    private static _getIntersection;
    constructor(A: any, B: any);
    A: any;
    B: any;
    y0: any;
    x0: any;
    dx: number;
    dy: number;
    /**
     * The slope of the ray, dy over dx
     * @type {number}
     */
    slope: number;
    /**
     * The normalized angle of the ray in radians on the range (-PI, PI)
     * @type {number}
     */
    angle: number;
    /**
     * The distance of the ray
     * @type {number}
     */
    distance: number;
    /**
     * A bounding rectangle that encompasses the Ray
     * @type {NormalizedRectangle}
     */
    get bounds(): NormalizedRectangle;
    /**
     * Return the value of the angle normalized to the range (0, 2*PI)
     * This is useful for testing whether an angle falls between two others
     * @type {number}
     */
    get normAngle(): number;
    /**
     * Project the Array by some proportion of it's initial distance.
     * Return the coordinates of that point along the path.
     * @param {number} t    The distance along the Ray
     * @return {Object}     The coordinates of the projected point
     */
    project(t: number): any;
    /**
     * Create a new ray which uses the same origin point, but a slightly offset angle and distance
     * @param {number} offset       An offset in radians which modifies the angle of the original Ray
     * @param {number} [distance]   A distance the new ray should project, otherwise uses the same distance.
     * @return {Ray}                A new Ray with an offset angle
     */
    shiftAngle(offset: number, distance?: number): Ray;
    /**
     * Find the point I[x,y] and distance t* on ray R(t) which intersects another ray
     * http://paulbourke.net/geometry/pointlineplane/
     *
     * @param {number[]} coords     An array of coordinates [x0, y0, x1, y1] which defines a line segment to test
     *
     * @return {{x: number, y: number, t0: number, t1: number}|false}
     *    The point of collision [x,y] the position of that collision point along the Ray (t0) an the tested
     *    segment (t1). Returns false if no collision occurs.
     */
    intersectSegment(coords: number[]): {
        x: number;
        y: number;
        t0: number;
        t1: number;
    } | false;
}
/**
 * @typedef {Object} Combatant
 * @property {Token|null} token
 * @property {Actor|null} actor
 * @property {string} name
 * @property {User[]} players
 * @property {boolean} owner
 * @property {boolean} visible
 */
/**
 * The Combat Entity defines a particular combat encounter which can occur within the game session
 * Combat instances belong to the CombatEncounters collection
 * @extends {Entity}
 */
declare class Combat extends Entity {
    /**
     * The configuration setting used to record Combat preferences
     * @type {string}
     */
    static CONFIG_SETTING: string;
    /** @override */
    static get config(): {
        baseEntity: typeof Combat;
        collection: any;
        embeddedEntities: {
            Combatant: string;
        };
        label: string;
    };
    constructor(...args: any[]);
    /**
     * Track the sorted turn order of this combat encounter
     * @type {Combatant[]}
     */
    turns: Combatant[];
    /**
     * Record the current round, turn, and tokenId to understand changes in the encounter state
     * @type {{round: number|null, turn: number|null, tokenId: string|null}}
     * @private
     */
    private current;
    /**
     * Track the previous round, turn, and tokenId to understand changes in the encounter state
     * @type {{round: number|null, turn: number|null, tokenId: string|null}}
     * @private
     */
    private previous;
    /**
     * Track whether a sound notification is currently being played to avoid double-dipping
     * @type {boolean}
     * @private
     */
    private _soundPlaying;
    /**
     * Return the Array of combatants sorted into initiative order, breaking ties alphabetically by name.
     * @return {Combatant[]}
     */
    setupTurns(): Combatant[];
    /**
     * Prepare turn data for one specific combatant.
     * @private
     */
    private _prepareCombatant;
    /**
     * Define how the array of Combatants is sorted in the displayed list of the tracker.
     * This method can be overridden by a system or module which needs to display combatants in an alternative order.
     * By default sort by initiative, falling back to name
     * @private
     */
    private _sortCombatants;
    /**
     * A convenience reference to the Array of combatant data within the Combat entity
     * @type {object[]}
     */
    get combatants(): any[];
    /**
     * Get the data object for the Combatant who has the current turn
     * @type {Combatant}
     */
    get combatant(): Combatant;
    /**
     * The numeric round of the Combat encounter
     * @type {number}
     */
    get round(): number;
    /**
     * The numeric turn of the combat round in the Combat encounter
     * @type {number}
     */
    get turn(): number;
    /**
     * Get the Scene entity for this Combat encounter
     * @return {Scene}
     */
    get scene(): Scene;
    /**
     * Return the object of settings which modify the Combat Tracker behavior
     * @return {object}
     */
    get settings(): any;
    /**
     * Has this combat encounter been started?
     * @type {boolean}
     */
    get started(): boolean;
    /**
     * Set the current Combat encounter as active within the Scene.
     * Deactivate all other Combat encounters within the viewed Scene and set this one as active
     * @return {Promise.<Combat>}
     */
    activate(): Promise<Combat>;
    /**
     * Begin the combat encounter, advancing to round 1 and turn 1
     * @return {Promise.<Combat>}
     */
    startCombat(): Promise<Combat>;
    /**
     * Advance the combat to the next turn
     * @return {Promise.<Combat>}
     */
    nextTurn(): Promise<Combat>;
    /**
     * Rewind the combat to the previous turn
     * @return {Promise.<Combat>}
     */
    previousTurn(): Promise<Combat>;
    /**
     * Advance the combat to the next round
     * @return {Promise.<Combat>}
     */
    nextRound(): Promise<Combat>;
    /**
     * Rewind the combat to the previous round
     * @return {Promise.<Combat>}
     */
    previousRound(): Promise<Combat>;
    /**
     * Reset all combatant initiative scores, setting the turn back to zero
     * @return {Promise.<Combat>}
     */
    resetAll(): Promise<Combat>;
    /**
     * Display a dialog querying the GM whether they wish to end the combat encounter and empty the tracker
     * @return {Promise<void>}
     */
    endCombat(): Promise<void>;
    /** @override */
    getCombatant(id: any): any;
    /**
     * Get a Combatant using its Token id
     * @param {string} tokenId   The id of the Token for which to acquire the combatant
     */
    getCombatantByToken(tokenId: string): Combatant;
    /**
     * Set initiative for a single Combatant within the Combat encounter.
     * Turns will be updated to keep the same combatant as current in the turn order
     * @param {string} id         The combatant ID for which to set initiative
     * @param {number} value      A specific initiative value to set
     */
    setInitiative(id: string, value: number): Promise<void>;
    /**
     * Roll initiative for one or multiple Combatants within the Combat entity
       * @param {string|string[]} ids             A Combatant id or Array of ids for which to roll
       * @param {Object} [options]                The initative options.
       * @param {string|null} [options.formula]   A non-default initiative formula to roll. Otherwise the system default is used.
       * @param {boolean} [options.updateTurn]    Update the Combat turn after adding new initiative scores to keep the turn on
       *                                          the same Combatant.
       * @param {object} [options.messageOptions] Additional options with which to customize created Chat Messages
       * @return {Promise.<Combat>}                A promise which resolves to the updated Combat entity once updates are complete.
     */
    rollInitiative(ids: string | string[], { formula, updateTurn, messageOptions }?: {
        formula: string | null;
        updateTurn: boolean;
        messageOptions: object;
    }): Promise<Combat>;
    /**
     * Acquire the default dice formula which should be used to roll initiative for a particular combatant.
     * Modules or systems could choose to override or extend this to accommodate special situations.
     * @private
     *
     * @param {object} combatant      Data for the specific combatant for whom to acquire an initiative formula. This
     *                                is not used by default, but provided to give flexibility for modules and systems.
     * @return {string}               The initiative formula to use for this combatant.
     */
    private _getInitiativeFormula;
    /**
     * Get a Roll object which represents the initiative roll for a given combatant.
     * @private
     * @param {object} combatant      Data for the specific combatant for whom to acquire an initiative formula. This
     *                                is not used by default, but provided to give flexibility for modules and systems.
     * @param {string} formula        An explicit Roll formula to use for the combatant.
     * @return {Roll}                 The Roll instance to use for the combatant.
     */
    private _getInitiativeRoll;
    /**
     * Roll initiative for all non-player actors who have not already rolled
     * @param {...*}  args    Additional arguments forwarded to the Combat.rollInitiative method
     */
    rollNPC(...args: any[]): Promise<Combat>;
    /**
     * Roll initiative for all combatants which have not already rolled
     * @param {...*} args     Additional arguments forwarded to the Combat.rollInitiative method
     */
    rollAll(...args: any[]): Promise<Combat>;
    /**
     * Create a new Combatant embedded entity
     * @see {@link Combat#createEmbeddedEntity}
     */
    createCombatant(data: any, options: any): Promise<{
        [x: string]: any;
    } | {
        [x: string]: any;
    }[]>;
    /**
     * Update an existing Combatant embedded entity
     * @see {@link Combat#updateEmbeddedEntity}
     */
    updateCombatant(data: any, options: any): Promise<Entity | Entity[]>;
    /**
     * Delete an existing Combatant embedded entity
     * @see {@link Combat#deleteEmbeddedEntity}
     */
    deleteCombatant(id: any, options: any): Promise<{
        [x: string]: any;
    } | {
        [x: string]: any;
    }[]>;
}
/**
 * An abstract class pattern for all primary data entities within the Foundry VTT Framework. An entity represents a
 * primary data concept, for example: Actor, Item, Scene, or ChatMessage. Each Entity type in Foundry Virtual
 * Tabletop extends this base Entity class which ensures similar behavior and workflow across all entity types.
 *
 * Documentation for this class is provided for reference, but developers should not extend this class directly,
 * instead work with or extend the Entity implementations that are referenced in this section of the API documentation.
 *
 * Entities are instantiated by providing their base data, and an optional Array of Application instances which should
 * be automatically refreshed when the Entity experiences an update.
 * @abstract
 * @interface
 *
 * @see {@link EntityCollection} The EntityCollection abstract class which contains Entity instances.
 * @see {@link Actor} The Actor Entity.
 * @see {@link Combat} The Combat Encounter Entity.
 * @see {@link Folder} The Folder Entity.
 * @see {@link Item} The Item Entity.
 * @see {@link JournalEntry} The Journal Entry Entity.
 * @see {@link ChatMessage} The Chat Message Entity.
 * @see {@link Playlist} The Audio Playlist Entity.
 * @see {@link Scene} The Scene Entity.
 * @see {@link RollTable} The Rollable Table Entity.
 * @see {@link User} The User Entity.
 * @see {@link Compendium} The Compendium which may contain Entities in a compendium pack.
 *
 * @param {Object} data       The data Object with which to create the Entity
 * @param {Object} options    Additional options which modify the created Entity behavior
 * @param {Compendium} [options.compendium] A reference to the Compendium pack from which this Entity was drawn.
 *
 * @example
 * let actorData = {name: "John Doe", type: "character", img: "icons/svg/mystery-man.svg"};
 * let actor = new Actor(actorData);
 */
declare class Entity {
    /**
     * Configure the attributes of this Entity class
     * @type {Object}
     * @property {Entity} baseEntity       The parent class which directly inherits from the Entity interface.
     * @property {EntityCollection} collection   The EntityCollection instance to which Entities of this type belong.
     * @property {string[]} embeddedEntities  The names of any Embedded Entities within the Entity data structure.
     */
    static get config(): any;
    /**
     * Return a reference to the EntityCollection instance which stores Entity instances of this type. This property is
     * available as both a static and instance method and should be overridden by subclass Entity implementations.
     * @type {EntityCollection}
     * @static
     */
    static get collection(): EntityCollection;
    /**
     * The class name of the base Entity type, for example "Actor". This is useful in cases where there is an inheritance
     * chain. Many places throughout the framework rely upon the canonical entity name which may not always be equal
     * to the class name. This property is available as both a static and instance method.
     * @type {string}
     *
     * @example
     * class Actor2ndGen extends Actor {...}
     * Actor2ndGen.entity // "Actor"
     */
    static get entity(): string;
    /**
     * Test whether a given User has permission to perform some action on this Entity
     * @param {User} user           The User requesting creation
     * @param {string} action       The attempted action
     * @param {Entity} target       The targeted Entity
     * @return {boolean}            Does the User have permission?
     */
    static can(user: User, action: string, target: Entity): boolean;
    /**
     * Activate the Socket event listeners used to receive responses from events which modify database documents
     * @param {Socket} socket   The active game socket
     */
    static activateSocketListeners(socket: any): void;
    /**
     * Create one or multiple new entities using provided input data.
     * Data may be provided as a single object to create one Entity, or as an Array of Objects.
     * Entities may be temporary (unsaved to the database) by passing the temporary option as true.
     * @static
     *
     * @param {Data|Data[]} data                A Data object or array of Data
     * @param {Options} [options]               Additional options which customize the creation workflow
     * @param {boolean} [options.temporary]     Create a temporary entity which is not saved to the world database. Default is false.
     * @param {boolean} [options.renderSheet]   Display the sheet for the created entity once it is created. Default is false.
     *
     * @return {Promise<Entity|Entity[]>}       The created Entity or array of Entities
     *
     * @example
     * const data = {name: "New Entity", type: "character", img: "path/to/profile.jpg"};
     * const created = await Entity.create(data); // Returns one Entity, saved to the database
     * const temp = await Entity.create(data, {temporary: true}); // Not saved to the database
     *
     * @example
     * const data = [{name: "Tim", type: "npc"], [{name: "Tom", type: "npc"}];
     * const created = await Entity.create(data); // Returns an Array of Entities, saved to the database
     * const created = await Entity.create(data, {temporary: true}); // Not saved to the database
     */
    static create(data: Data | Data[], options?: Options): Promise<Entity | Entity[]>;
    /**
     * Handle a SocketResponse from the server when one or multiple Entities are created
     * @param {SocketRequest} request     The initial request
     * @param {Data[]} result             An Array of created Entity data
     * @param {string} userId             The id of the requesting User
     * @return {Entity[]}                 An Array of constructed Entity instances
     * @private
     */
    private static _handleCreate;
    /**
     * Update one or multiple existing entities using provided input data.
     * Data may be provided as a single object to update one Entity, or as an Array of Objects.
     * @static
     *
     * @param {Data|Data[]} data            A Data object or array of Data. Each element must contain the _id of an existing Entity.
     * @param {Options} [options]           Additional options which customize the update workflow
     * @param {boolean} [options.diff]      Difference the provided data against the current to eliminate unnecessary changes.
     *
     * @return {Promise<Entity|Entity[]>}   The updated Entity or array of Entities
     *
     * @example
     * const data = {_id: "12ekjf43kj2312ds", name: "New Name"}};
     * const updated = await Entity.update(data); // Updated entity saved to the database
     *
     * @example
     * const data = [{_id: "12ekjf43kj2312ds", name: "New Name 1"}, {_id: "kj549dk48k34jk34", name: "New Name 2"}]};
     * const updated = await Entity.update(data); // Returns an Array of Entities, updated in the database
     */
    static update(data: Data | Data[], options?: Options): Promise<Entity | Entity[]>;
    /**
     * Handle a SocketResponse from the server when one or multiple Entities are updated
     * @param {SocketRequest} request     The initial request
     * @param {Data[]} result             An Array of updated Entity data
     * @param {string} userId             The id of the requesting User
     * @return {Entity[]}                 An Array of constructed Entity instances
     * @private
     */
    private static _handleUpdate;
    /**
     * Delete one or multiple existing entities using provided ids.
     * The target ids may be a single string or an Array of strings.
     * @static
     *
     * @param {string|string[]} data            A single id or Array of ids
     * @param {Options} [options]               Additional options which customize the deletion workflow
  
     * @return {Promise<Entity|Entity[]>}       The deleted Entity or array of Entities
     *
     * @example
     * const id = "12ekjf43kj2312ds";
     * const deleted = await Entity.delete(id); // A single deleted entity from the database
     *
     * @example
     * const ids = ["12ekjf43kj2312ds", "kj549dk48k34jk34"];
     * const deleted = await Entity.delete(ids); // Returns an Array of deleted Entities
     */
    static delete(data: string | string[], options?: Options): Promise<Entity | Entity[]>;
    /**
     * Handle a SocketResponse from the server when one or multiple Entities are deleted
     * @param {SocketRequest} request     The initial request
     * @param {string[]} result           An Array of deleted Entity ids
     * @param {string} userId             The id of the requesting User
     * @return {Entity[]}                 An Array of deleted Entity instances
     * @private
     */
    private static _handleDelete;
    /**
     * Handle a SocketResponse from the server when one or multiple Embedded Entities are created
     * @param {SocketRequest} request     The initial request
     * @param {Data[]} result             An Array of created Entity data
     * @param {string} userId             The id of the requesting User
     * @return {Data[]}                   An Array of constructed EmbeddedDocument data
     * @private
     */
    private static _handleCreateEmbeddedEntity;
    /**
     * Handle a SocketResponse from the server when one or multiple Embedded Entities are updated
     * @param {SocketRequest} request     The initial request
     * @param {Data[]} result             An Array of updated Entity data
     * @param {string} userId             The id of the requesting User
     * @return {Data[]}                   An Array of updated EmbeddedDocument data
     * @private
     */
    private static _handleUpdateEmbeddedEntity;
    /**
     * Handle a SocketResponse from the server when one or multiple Embedded Entities are deleted
     * @param {SocketRequest} request     Th2e initial request
     * @param {string[]} result           An Array of deleted EmbeddedEntity ids
     * @param {string} userId             The id of the requesting User
     * @return {Data[]}                   An Array of deleted EmbeddedDocument data
     * @private
     */
    private static _handleDeleteEmbeddedEntity;
    /**
     * A helper function to handle obtaining the dropped Entity data from a dropped event. Entity drop data could have:
     * 1. A compendium pack and entry id
     * 2. A World Entity _id
     * 3. A data object explicitly provided
     *
     * @param {object} data     The data object extracted from a DataTransfer event
     * @return {Entity}         The Entity data that should be handled by the drop handler
     */
    static fromDropData(data: object): Entity;
    /**
     * Provide a Dialog form to create a new Entity of this type.
     * Choose a name and a type from a select menu of types.
     * @param {object} data       Initial data with which to populate the creation form
     * @param {object} options    Initial positioning and sizing options for the dialog form
     * @return {Promise<Entity>}  A Promise which resolves to the created Entity
     */
    static createDialog(data?: object, options?: object): Promise<Entity>;
    constructor(data: any, options: any);
    /**
     * The original source data for the Entity provided upon initialization.
     * This reflects the database state of the Entity before any transformations are applied.
     * @type {Object}
     */
    _data: any;
    /**
     * The effective data for the Entity.
     * This data object may have transformations applied to it.
     * @type {Object}
     */
    data: any;
    /**
     * The options object that was used to configure the Entity upon initialization.
     * @type {Object}
     */
    options: any;
    /**
     * A collection of Application instances which should be re-rendered whenever this Entity experiences an update to
     * its data. The keys of this object are the application ids and the values are Application instances. Each
     * Application in this object will have its render method called by {@link Entity#render}.
     * @type {Object.<Application>}
     * @see {Entity#render}
     */
    apps: any;
    /**
     * The Entity may optionally belong to a parent Compendium pack. If so this attribute will contain a reference
     * to that Compendium object. Otherwise null.
     * @type {Compendium|null}
     */
    compendium: Compendium | null;
    /**
     * Safely Initialize data structure for the Entity.
     * Errors that occur here should be captured and logged, but should not break construction of the Entity instance.
     */
    _initialize(): void;
    /**
     * A Universally Unique Identifier (uuid) for this Entity instance
     * @type {string}
     */
    get uuid(): string;
    /**
     * Prepare data for the Entity whenever the instance is first created or later updated.
     * This method can be used to derive any internal attributes which are computed in a formulaic manner.
     * For example, in a d20 system - computing an ability modifier based on the value of that ability score.
     */
    prepareData(): any;
    /**
     * Prepare Embedded Entities which exist within this parent Entity.
     * For example, in the case of an Actor, this method is responsible for preparing the Owned Items the Actor contains.
     */
    prepareEmbeddedEntities(): void;
    /**
     * Obtain a reference to the Array of source data within the data object for a certain Embedded Entity name
     * @param {string} embeddedName   The name of the Embedded Entity type
     * @return {object[]}             The Array of source data where Embedded Entities of this type are stored
     */
    getEmbeddedCollection(embeddedName: string): object[];
    /**
     * Render all of the Application instances which are connected to this Entity by calling their respective
     * {@link Application#render} methods.
     * @param {boolean} force       Force rendering
     * @param {Options} [context]   Optional context
     */
    render(force: boolean, context?: Options): void;
    /** @alias {Entity.collection} */
    get collection(): any;
    /** @alias {Entity.entity} */
    get entity(): any;
    /**
     * A convenience accessor for the _id attribute of the Entity data object.
     * @type {string}
     */
    get id(): string;
    /** @alias {Entity#id} */
    get _id(): any;
    /**
     * A convenience accessor for the name attribute of the Entity data object
     * @type {string}
     */
    get name(): string;
    /**
     * A property which gets or creates a singleton instance of the sheet class used to render and edit data for this
     * particular entity type.
     * @type {BaseEntitySheet|null}
     *
     * @example <caption>A subclass of the Actor entity</caption>
     * let actor = game.entities.actors[0];
     * actor.sheet; // ActorSheet
     */
    get sheet(): BaseEntitySheet;
    /**
     * Obtain a reference to the BaseEntitySheet implementation which should be used to render the Entity instance
     * configuration sheet.
     * @private
     */
    private get _sheetClass();
    /**
     * Return a reference to the Folder which this Entity belongs to, if any.
     * @type {Folder|null}
     *
     * @example <caption>Entities may belong to Folders</caption>
     * let folder = game.folders.entities[0];
     * let actor = await Actor.create({name: "New Actor", folder: folder.id});
     * console.log(actor.data.folder); // folder.id;
     * console.log(actor.folder); // folder;
     */
    get folder(): Folder;
    /**
     * Return the permission level that the current game User has over this Entity.
     * See the CONST.ENTITY_PERMISSIONS object for an enumeration of these levels.
     * @type {number}
     *
     * @example
     * game.user.id; // "dkasjkkj23kjf"
     * entity.data.permission; // {default: 1, "dkasjkkj23kjf": 2};
     * entity.permission; // 2
     */
    get permission(): number;
    /**
     * A boolean indicator for whether or not the current game User has ownership rights for this Entity.
     * This property has a setter which allows for ownership rights to be temporarily overridden on a per-instance basis.
     * @type {boolean}
     */
    get owner(): boolean;
    /**
     * A boolean indicator for whether or not the current game User has at least limited visibility for this Entity.
     * @type {boolean}
     */
    get visible(): boolean;
    /**
     * A boolean indicator for whether the current game user has ONLY limited visibility for this Entity.
     * Note that a GM user's perspective of an Entity is never limited.
     * @type {boolean}
     */
    get limited(): boolean;
    /**
     * Test whether a provided User a specific permission level (or greater) over the Entity instance
     * @param {User} user                   The user to test for permission
     * @param {string|number} permission    The permission level or level name to test
     * @param {boolean} exact               Tests for an exact permission level match, by default this method tests for
     *                                      an equal or greater permission level.
     * @return {boolean}                    Whether or not the user has the permission for this Entity.
     *
     * @example <caption>Test whether a specific user has a certain permission</caption>
     * // These two are equivalent
     * entity.hasPerm(game.user, "OWNER");
     * entity.owner;
     * // These two are also equivalent
     * entity.hasPerm(game.user, "LIMITED", true);
     * entity.limited;
     */
    hasPerm(user: User, permission: string | number, exact?: boolean): boolean;
    /**
     * Test whether a given User has permission to perform some action on this Entity
     * @alias Entity.can
     */
    can(user: any, action: any): any;
    /**
     * Test for whether this Entity can be owned by any non-gamemaster player.
     * @return {boolean}
     */
    get hasPlayerOwner(): boolean;
    /**
     * Entity-specific actions that should occur when the Entity is first created
     * @private
     */
    private _onCreate;
    /**
     * Entity-specific actions that should occur when the Entity is updated
     * @private
     */
    private _onUpdate;
    /**
   * Update the current Entity using provided input data.
   * Data must be provided as a single object which updates the Entity data.
   * @see {Entity.update}
   *
   * @param {Data} data            A Data object which updates the Entity
   * @param {Options} [options]    Additional options which customize the update workflow
   * @return {Promise<Entity>}     The updated Entity
   */
    update(data: Data, options?: Options): Promise<Entity>;
    /**
     * Entity-specific actions that should occur when the Entity is deleted
     * @private
     */
    private _onDelete;
    /**
   * Delete the current Entity.
   * @see {Entity.delete}

   * @param {Options} [options]    Options which customize the deletion workflow
   * @return {Promise<Entity>}     The deleted Entity
   */
    delete(options?: Options): Promise<Entity>;
    /**
     * Get an Embedded Entity by it's id from a named collection in the parent Entity.
     *
       * @param {string} embeddedName         The name of the Embedded Entity type to retrieve
       * @param {string} id                   The numeric ID of the child to retrieve
       * @param {Objects} [options]           The options to get an embedded entity
       * @param {boolean} [options.strict]    Throw an Error if the requested id does not exist, otherwise return null. Default false.
       * @return {Object|null}                Retrieved data for the requested child, or null
     */
    getEmbeddedEntity(embeddedName: string, id: string, { strict }?: any): any | null;
    /**
     * Create one or multiple EmbeddedEntities within this parent Entity.
     * Data may be provided as a single Object to create one EmbeddedEntity or as an Array of Objects to create many.
     * Entities may be temporary (unsaved to the database) by passing the temporary option as true.
     *
     * @param {string} embeddedName              The name of the Embedded Entity class to create
     * @param {Data|Data[]} data                 A Data object or an Array of Data objects to create
     * @param {Options} [options]                Additional creation options which modify the request
     * @param {boolean} [options.temporary]      Create a temporary entity which is not saved to the world database. Default is false.
     * @param {boolean} [options.renderSheet]    Display the sheet for each created Embedded Entities once created.
     *
     * @return {Promise<Data|Data[]>} A Promise which resolves to the created embedded Data once the creation request is successful
     *
     * @example
     * const actor = game.actors.get("dfv934kj23lk6h9k");
     * const data = {name: "Magic Sword", type: "weapon", img: "path/to/icon.png"};
     * const created = await actor.createEmbeddedEntity("OwnedItem", data); // Returns one EmbeddedEntity, saved to the Actor
     * const temp = await actor.createEmbeddedEntity("OwnedItem", data, {temporary: true}); // Not saved to the Actor
     *
     * @example
     * const actor = game.actors.get("dfv934kj23lk6h9k");
     * const data = [{name: "Mace of Crushing", type: "weapon"}, {name: "Shield of Defense", type: "armor"}];
     * const created = await actor.createEmbeddedEntity("OwnedItem", data); // Returns an Array of EmbeddedEntities, saved to the Actor
     * const temp = await actor.createEmbeddedEntity("OwnedItem", data, {temporary: true}); // Not saved to the Actor
     */
    createEmbeddedEntity(embeddedName: string, data: Data | Data[], options?: Options): Promise<Data | Data[]>;
    /**
     * Handle Embedded Entity creation within this Entity with specific callback steps.
     * This function is triggered once per EmbeddedEntity which is updated.
     * It therefore may run multiple times per creation workflow.
     * Any steps defined here should run on a per-EmbeddedEntity basis.
     * Steps that should run once for the whole batch should go in _onModifyEmbeddedEntity()
     * @private
     */
    private _onCreateEmbeddedEntity;
    /**
     * Update one or multiple existing entities using provided input data.
     * Data may be provided as a single object to update one Entity, or as an Array of Objects.
     * @static
     *
     * @param {string} embeddedName         The name of the Embedded Entity class to create
     * @param {Data|Data[]} data            A Data object or array of Data. Each element must contain the _id of an existing Entity.
     * @param {Options} [options]           Additional options which customize the update workflow
     * @param {boolean} [options.diff]      Difference the provided data against the current to eliminate unnecessary changes.
     *
     * @return {Promise<Entity|Entity[]>}   The updated Entity or array of Entities
     *
     * @example
     * const actor = game.actors.get("dfv934kj23lk6h9k");
     * const item = actor.data.items.find(i => i.name === "Magic Sword");
     * const update = {_id: item._id, name: "Magic Sword +1"};
     * const updated = await actor.updateEmbeddedEntity("OwnedItem", update); // Updates one EmbeddedEntity
     *
     * @example
     * const actor = game.actors.get("dfv934kj23lk6h9k");
     * const weapons = actor.data.items.filter(i => i.type === "weapon");
     * const updates = weapons.map(i => {
     *   return {_id: i._id, name: i.name + "+1"};
     * }
     * const updated = await actor.createEmbeddedEntity("OwnedItem", updates); // Updates multiple EmbeddedEntity objects
     */
    updateEmbeddedEntity(embeddedName: string, data: Data | Data[], options?: Options): Promise<Entity | Entity[]>;
    /**
     * Handle Embedded Entity updates within this Entity with specific callback steps.
     * This function is triggered once per EmbeddedEntity which is updated.
     * It therefore may run multiple times per creation workflow.
     * Any steps defined here should run on a per-EmbeddedEntity basis.
     * Steps that should run once for the whole batch should go in _onModifyEmbeddedEntity()
     * @private
     */
    private _onUpdateEmbeddedEntity;
    /**
     * Delete one or multiple existing EmbeddedEntity objects using provided input data.
     * Data may be provided as a single id to delete one object or as an Array of string ids.
     * @static
     *
     * @param {string} embeddedName     The name of the Embedded Entity class to create
     * @param {string|string[]} data    A Data object or array of Data. Each element must contain the _id of an existing Entity.
     * @param {Options} [options]       Additional options which customize the update workflow
  
     * @return {Promise<Data|Data[]>}       The deleted Embedded Entities
     *
     * @example
     * const actor = game.actors.get("dfv934kj23lk6h9k");
     * const item = actor.data.items.find(i => i.name === "Magic Sword");
     * const deleted = await actor.deleteEmbeddedEntity("OwnedItem", item._id); // Deletes one EmbeddedEntity
     *
     * @example
     * const actor = game.actors.get("dfv934kj23lk6h9k");
     * const weapons = actor.data.items.filter(i => i.type === "weapon");
     * const deletions = weapons.map(i => i._id);
     * const deleted = await actor.deleteEmbeddedEntity("OwnedItem", deletions); // Deletes multiple EmbeddedEntity objects
  
     */
    deleteEmbeddedEntity(embeddedName: string, data: string | string[], options?: Options): Promise<Data | Data[]>;
    /**
     * Handle Embedded Entity deletion within this Entity with specific callback steps.
     * This function is triggered once per EmbeddedEntity which is updated.
     * It therefore may run multiple times per creation workflow.
     * Any steps defined here should run on a per-EmbeddedEntity basis.
     * Steps that should run once for the whole batch should go in _onModifyEmbeddedEntity()
     * @private
     */
    private _onDeleteEmbeddedEntity;
    /**
     * A generic helper since we take the same actions for every type of Embedded Entity update
     * Unlike the specific _onCreate, _onUpdate, and _onDelete methods this only runs once per updated batch
     * @private
     */
    private _onModifyEmbeddedEntity;
    /**
     * Get the value of a "flag" for this Entity
     * See the setFlag method for more details on flags
     *
     * @param {string} scope    The flag scope which namespaces the key
     * @param {string} key      The flag key
     * @return {*}              The flag value
     */
    getFlag(scope: string, key: string): any;
    /**
     * Assign a "flag" to this Entity.
     * Flags represent key-value type data which can be used to store flexible or arbitrary data required by either
     * the core software, game systems, or user-created modules.
     *
     * Each flag should be set using a scope which provides a namespace for the flag to help prevent collisions.
     *
     * Flags set by the core software use the "core" scope.
     * Flags set by game systems or modules should use the canonical name attribute for the module
     * Flags set by an individual world should "world" as the scope.
     *
     * Flag values can assume almost any data type. Setting a flag value to null will delete that flag.
     *
     * @param {string} scope    The flag scope which namespaces the key
     * @param {string} key      The flag key
     * @param {*} value         The flag value
     *
     * @return {Promise.<Entity>} A Promise resolving to the updated Entity
     */
    setFlag(scope: string, key: string, value: any): Promise<Entity>;
    /**
     * Remove a flag assigned to the Entity
     * @param {string} scope    The flag scope which namespaces the key
     * @param {string} key      The flag key
     * @return {Promise}        A Promise resolving to the updated Entity
     */
    unsetFlag(scope: string, key: string): Promise<any>;
    /**
     * Sort this Entity relative a target by providing the target, an Array of siblings and other options.
     * If the Entity has an rendered sheet, record the sort change as part of a form submission
     * See SortingHelper.performIntegerSort for more details
     */
    sortRelative({ target, siblings, sortKey, sortBefore, updateData }?: {
        target?: any;
        siblings?: any[];
        sortKey?: string;
        sortBefore?: boolean;
        updateData?: {};
    }): Promise<void>;
    /**
     * Clone an Entity, creating a new Entity using the current data as well as provided creation overrides.
     *
     * @param {Object} createData     Additional data which overrides current Entity data at the time of creation
     * @param {Object} options        Additional creation options passed to the Entity.create method
     * @returns {Promise.<Entity>}    A Promise which resolves to the created clone Entity
     */
    clone(createData?: any, options?: any): Promise<Entity>;
    /**
     * Serializing an Entity should simply serialize it's inner data, not the entire instance
     * @return {Object}
     */
    toJSON(): any;
    /**
     * Export entity data to a JSON file which can be saved by the client and later imported into a different session
     */
    exportToJSON(): void;
    /**
     * Import data and update this entity
     * @param {string} json         JSON data string
     * @return {Promise.<Entity>}   The updated Entity
     */
    importFromJSON(json: string): Promise<Entity>;
    /**
     * Render an import dialog for updating the data related to this Entity through an exported JSON file
     * @return {Promise.<void>}
     */
    importFromJSONDialog(): Promise<void>;
    /**
     * Transform the Entity data to be stored in a Compendium pack.
     * Remove any features of the data which are world-specific.
     * This function is asynchronous in case any complex operations are required prior to exporting.
     *
     * @return {Object}   A data object of cleaned data ready for compendium import
     */
    toCompendium(): any;
}
/**
 * An Active Effect instance within a parent Actor or Item.
 * @see {@link Actor#effects}
 * @see {@link Item#effects} *
 * @typedef {{key: string, value: *, mode: number, priority: number}} ActiveEffectChange
 * @extends {EmbeddedEntity}
 */
declare class ActiveEffect extends EmbeddedEntity {
    /**
     * A factory method which creates an ActiveEffect instance using the configured class.
     * @param {...*} args     Initialization arguments passed to the ActiveEffect constructor.
     * @return {ActiveEffect} The constructed ActiveEffect instance.
     */
    static create(...args: any[]): ActiveEffect;
    constructor(data: any, parent: any);
    /**
     * Describe whether the ActiveEffect has a temporary duration based on combat turns or rounds.
     * @type {boolean}
     */
    get isTemporary(): boolean;
    /**
     * Apply this ActiveEffect to a provided Actor.
     * @param {Actor} actor                 The Actor to whom this effect should be applied
     * @param {ActiveEffectChange} change   The change data being applied
     * @return {*}                          The resulting applied value
     */
    apply(actor: Actor, change: ActiveEffectChange): any;
    /**
     * Apply an ActiveEffect that uses an ADD application mode.
     * @param {Actor} actor                 The Actor to whom this effect should be applied
     * @param {ActiveEffectChange} change   The change data being applied
     * @return {*}                          The resulting applied value
     * @private
     */
    private _applyAdd;
    /**
     * Apply an ActiveEffect that uses a MULTIPLY application mode.
     * @param {Actor} actor                 The Actor to whom this effect should be applied
     * @param {ActiveEffectChange} change   The change data being applied
     * @return {*}                          The resulting applied value
     * @private
     */
    private _applyMultiply;
    /**
     * Apply an ActiveEffect that uses an OVERRIDE, UPGRADE, or DOWNGRADE application mode.
     * @param {Actor} actor                 The Actor to whom this effect should be applied
     * @param {ActiveEffectChange} change   The change data being applied
     * @return {*}                          The resulting applied value
     * @private
     */
    private _applyOverride;
    /**
     * Apply an ActiveEffect that uses a CUSTOM application mode.
     * @param {Actor} actor                 The Actor to whom this effect should be applied
     * @param {ActiveEffectChange} change   The change data being applied
     * @return {*}                          The resulting applied value
     * @private
     */
    private _applyCustom;
    /**
     * A convenience method for updating an ActiveEffect instance in an parent Actor.
     * @see {@link Actor#updateEmbeddedEntity}
     * @param {Data} data            Differential data with which to update the ActiveEffect.
     * @param {Options} [options]    Configuration options which modify the request.
     * @return {Promise<Data>}       The updated ActiveEffect data.
     */
    update(data: Data, options?: Options): Promise<Data>;
    /**
     * A convenience method for deleting an ActiveEffect instance in an parent Actor.
     * @see {@link Actor#deleteEmbeddedEntity}
     * @param {Options} [options]    Configuration options which modify the request.
     * @return {Promise<string>}     The deleted ActiveEffect _id.
     */
    delete(options?: Options): Promise<string>;
}
/**
 * A reusable storage concept which blends the functionality of an Array with the efficient key-based lookup of a Map.
 * This concept is reused throughout Foundry VTT where a collection of uniquely identified elements is required.
 * @typedef {*} Collection~K
 * @typedef {*} Collection~V
 *
 * @extends {Map}
 */
export class Collection extends Map<any, any> {
    constructor(entries: any);
    /**
     * Find an entry in the Map using an functional condition.
     * @see {Array#find}
     *
     * @param {Function} condition  The functional condition to test
     * @return {Collection~V|null}  The value, if found, otherwise null
     *
     * @example
     * let c = new Collection([["a", "A"], ["b", "B"], ["c", "C"]]);
     * let a = c.find(entry => entry === "A");
     */
    find(condition: Function): Collection;
    /**
     * Filter the Collection, returning an Array of entries which match a functional condition.
     * @see {Array#filter}
     * @param {Function} condition  The functional condition to test
     * @return {Collection~V[]}     An Array of matched values
     *
     * @example
     * let c = new Collection([["a", "AA"], ["b", "AB"], ["c", "CC"]]);
     * let hasA = c.filters(entry => entry.slice(0) === "A");
     */
    filter(condition: Function): Collection;
    /**
     * Get an entry from the Collection by name.
     * Use of this method assumes that the objects stored in the collection have a "name" attribute.
       * @param {string} name                 The name of the entry to retrieve
       * @param {Object} [options]            The options for getting an item from the Collection.
       * @param {boolean} [options.strict]    Throw an Error if the requested id does not exist, otherwise return null. Default false.
       * @return {Collection~V|null}          The retrieved Entity, if one was found, otherwise null;
     */
    getName(name: string, { strict }?: {
        strict: boolean;
    }): Collection;
    /**
     * Transform each element of the Collection into a new form, returning an Array of transformed values
     * @param {Function} transformer  The transformation function to apply to each entry value
     * @return {Collection~V[]}       An Array of transformed values
     */
    map(transformer: Function): Collection;
    /**
     * Reduce the Collection by applying an evaluator function and accumulating entries
     * @see {Array#reduce}
     *
     * @typedef {*} reduce~Accumulator The accumulator type.
     * @typedef {(accumulator: reduce~Accumulator, item: Collection~V) => reduce~Accumulator} reduce~Evaluator An accumulator function.
     *
     * @param {reduce~Evaluator} evaluator    A function which mutates the accumulator each iteration
     * @param {reduce~Accumulator} initial    An initial value which accumulates with each iteration
     * @return {reduce~Accumulator}           The accumulated result
     *
     * @example
     * let c = new Collection([["a", "A"], ["b", "B"], ["c", "C"]]);
     * let letters = c.reduce((s, l) => {
     *   return s + l;
     * }, ""); // "ABC"
     */
    reduce(evaluator: any, initial: any): any;
}
/**
 * The Item entity.
 * This base Item refers primarily to items which are not currently owned.
 * @type {Entity}
 */
declare class Item extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof Item;
        collection: any;
        embeddedEntities: {
            ActiveEffect: string;
        };
        label: string;
        permissions: {
            create: string;
        };
    };
    /**
     * A convenience constructor method to create an Item instance which is owned by an Actor
     * @param {Object} itemData
     * @param {Actor} actor
     */
    static createOwned(itemData: any, actor: Actor): any;
    constructor(data: any, options: any);
    effects: Collection;
    /**
     * Prepare a Collection of ActiveEffect instances which belong to this Item.
     * @param {object[]} effects      The raw array of active effect objects
     * @return {Collection}           The active effects collection
     * @private
     */
    private _prepareActiveEffects;
    /**
     * A convenience reference to the Actor entity which owns this item, if any
     * @type {Actor|null}
     */
    get actor(): Actor;
    /**
     * A convenience reference to the image path (data.img) used to represent this Item
     * @type {string}
     */
    get img(): string;
    /**
     * Return an array of the Active Effect instances which originated from this Item.
     * If the Item is owned, the returned instances are the ActiveEffect instances which exist on the owning Actor.
     * If the Item is unowned, the returned instances are the ActiveEffect instances which exist on the Item itself.
     * @type {ActiveEffect[]}
     */
    get transferredEffects(): ActiveEffect[];
    /**
     * A convenience reference to the item type (data.type) of this Item
     * @type {string}
     */
    get type(): string;
    /**
     * A flag for whether the item is owned by an Actor entity
     * @return {boolean}
     */
    get isOwned(): boolean;
}
/**
 * The Macro entity which implements a triggered chat or script expression which can be quickly activated by the user.
 * All users have permission to create and use chat-based Macros, but users must be given special permission to use
 * script-based macros.
 *
 * @extends {Entity}
 *
 * @see {@link Macros}        The EntityCollection of Macro entities
 * @see {@link MacroConfig}   The Macro Configuration sheet
 * @see {@link Hotbar}        The Hotbar interface application
 */
declare class Macro extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof Macro;
        collection: any;
        embeddedEntities: {};
        label: string;
    };
    /** @override */
    static can(user: any, action: any, target: any): any;
    constructor(data: any, options: any);
    /**
     * Is the current User the author of this macro?
     * @type {boolean}
     */
    get isAuthor(): boolean;
    /**
     * Execute the Macro command
     * @return {Promise}
     */
    execute(): Promise<any>;
}
/**
 * The Scene Entity.
 * Scenes represent the locations and settings which Actors will explore within the World.
 * @extends {Entity}
 */
declare class Scene extends Entity {
    /** @extends {EntityCollection.config} */
    static get config(): {
        baseEntity: typeof Scene;
        collection: any;
        embeddedEntities: {
            AmbientLight: string;
            AmbientSound: string;
            Drawing: string;
            Note: string;
            MeasuredTemplate: string;
            Tile: string;
            Token: string;
            Wall: string;
        };
        label: string;
    };
    /** @override */
    static _handleCreateEmbeddedEntity({ request, result, userId }?: {
        request: any;
        result?: any[];
        userId: any;
    }): {
        [x: string]: any;
    }[];
    /** @override */
    static _handleUpdateEmbeddedEntity({ request, result, userId }?: {
        request: any;
        result?: any[];
        userId: any;
    }): {
        [x: string]: any;
    }[];
    /** @override */
    static _handleDeleteEmbeddedEntity({ request, result, userId }?: {
        request: any;
        result?: any[];
        userId: any;
    }): {
        [x: string]: any;
    }[];
    constructor(...args: any[]);
    /**
     * Track whether the scene is the active view
     * @type {boolean}
     */
    _view: boolean;
    /**
     * Track the viewed position of each scene (while in memory only, not persisted)
     * When switching back to a previously viewed scene, we can automatically pan to the previous position.
     * Object with keys: x, y, scale
     * @type {Object}
     */
    _viewPosition: any;
    /**
     * A convenience accessor for the background image of the Scene
     * @type {string}
     */
    get img(): string;
    /**
     * A convenience accessor for whether the Scene is currently active
     * @type {boolean}
     */
    get active(): boolean;
    /**
     * A convenience accessor for whether the Scene is currently viewed
     * @type {boolean}
     */
    get isView(): boolean;
    /**
     * A reference to the JournalEntry entity associated with this Scene, or null
     * @return {JournalEntry|null}
     */
    get journal(): JournalEntry;
    /**
     * A reference to the Playlist entity for this Scene, or null
     * @type {Playlist|null}
     */
    get playlist(): Playlist;
    /**
     * Set this scene as the current view
     */
    view(): Promise<any>;
    /**
     * Set this scene as currently active
     * @return {Promise}  A Promise which resolves to the current scene once it has been successfully activated
     */
    activate(): Promise<any>;
    /**
     * Handle Scene activation workflow if the active state is changed to true
     * @private
     */
    private _onActivate;
    /**
     * Create a 300px by 100px thumbnail image for this scene background
       * @param {Object} [options]             The options for creating an image thumbnail
       * @param {string|null} [options.img]    A background image to use for thumbnail creation, otherwise the current scene
       *                                       background is used.
       * @param {number} [options.width]       The desired thumbnail width. Default is 300px
       * @param {number} [options.height]      The desired thumbnail height. Default is 100px;
       * @return {object}                      The created thumbnail data.
     */
    createThumbnail({ img, width, height }?: {
        img: string | null;
        width: number;
        height: number;
    }): object;
}
/**
 * A generic helper for drawing a standard Control Icon
 * @type {PIXI.Container}
 */
declare class ControlIcon {
    constructor({ texture, size, borderColor, tint }?: {
        texture: any;
        size?: number;
        borderColor?: number;
        tint?: any;
    }, ...args: any[]);
    iconSrc: any;
    size: number;
    rect: number[];
    borderColor: number;
    tintColor: any;
    interactive: boolean;
    interactiveChildren: boolean;
    hitArea: any;
    bg: any;
    icon: any;
    border: any;
    draw(): Promise<ControlIcon>;
    texture: any;
    _onHoverIn(event: any): void;
    _onHoverOut(event: any): void;
}
/**
 * Handle mouse interaction events for a Canvas object.
 * There are three phases of events: hover, click, and drag
 *
 * Hover Events:
 * _handleMouseOver
 *  action: hoverIn
 * _handleMouseOut
 *  action: hoverOut
 *
 * Left Click and Double-Click
 * _handleMouseDown
 *  action: clickLeft
 *  action: clickLeft2
 *
 * Right Click and Double-Click
 * _handleRightDown
 *  action: clickRight
 *  action: clickRight2
 *
 * Drag and Drop
 * _handleMouseMove
 *  action: dragLeftStart
 *  action: dragLeftMove
 *  action: dragRightStart
 *  action: dragLeftMove
 * _handleMouseUp
 *  action: dragLeftDrop
 *  action: dragRightDrop
 * _handleDragCancel
 *  action: dragLeftCancel
 *  action: dragRightCancel
 */
declare class MouseInteractionManager {
    constructor(object: any, layer: any, permissions?: {}, callbacks?: {}, options?: {});
    object: any;
    layer: any;
    permissions: {};
    callbacks: {};
    options: {};
    /**
     * The current interaction state
     * @type {number}
     */
    state: number;
    /**
     * Bound handlers which can be added and removed
     * @type {{string: Function}}
     */
    handlers: {
        string: Function;
    };
    /**
     * The drag handling time
     * @type {number}
     */
    dragTime: number;
    /**
     * The time of the last left-click event
     * @type {number}
     */
    lcTime: number;
    /**
     * The time of the last right-click event
     * @type {number}
     */
    rcTime: number;
    /**
     * A flag for whether we are right-click dragging
     * @type {boolean}
     */
    _dragRight: boolean;
    /**
     * Get the target
     * @return {*}
     */
    get target(): any;
    /**
     * Activate interactivity for the handled object
     */
    activate(): MouseInteractionManager;
    /**
     * Test whether the current user has permission to perform a step of the workflow
     * @param {string} action     The action being attempted
     * @param {Event} event       The event being handled
     * @return {boolean}          Can the action be performed?
     */
    can(action: string, event: Event): boolean;
    /**
     * Execute a callback function associated with a certain action in the workflow
     * @param {string} action     The action being attempted
     * @param {Event} event       The event being handled
     */
    callback(action: string, event: Event): any;
    /**
     * A reference to the possible interaction states which can be observed
     * @return {Object<string, number>}
     */
    get states(): {
        [x: string]: number;
    };
    /**
     * Activate a set of listeners which handle hover events on the target object
     * @private
     */
    private _activateHoverEvents;
    /**
     * Activate a new set of listeners for click events on the target object
     * @private
     */
    private _activateClickEvents;
    /**
     * Deactivate event listeners for click events on the target object
     * @private
     */
    private _deactivateClickEvents;
    /**
     * Activate events required for handling a drag-and-drop workflow
     * @private
     */
    private _activateDragEvents;
    /**
     * Deactivate events required for handling drag-and-drop workflow.
     * @private
     */
    private _deactivateDragEvents;
    /**
     * Handle mouse-over events which activate downstream listeners and do not stop propagation.
     * @private
     */
    private _handleMouseOver;
    /**
     * Handle mouse-out events which terminate hover workflows and do not stop propagation.
     * @private
     */
    private _handleMouseOut;
    /**
     * Handle mouse-down events which activate downstream listeners.
     * Stop further propagation only if the event is allowed by either single or double-click.
     * @private
     */
    private _handleMouseDown;
    /**
     * Handle mouse-down which trigger a single left-click workflow.
     * @private
     */
    private _handleClickLeft;
    /**
     * Handle mouse-down which trigger a single left-click workflow.
     * @private
     */
    private _handleClickLeft2;
    /**
     * Handle right-click mouse-down events.
     * Stop further propagation only if the event is allowed by either single or double-click.
     * @private
     */
    private _handleRightDown;
    /**
     * Handle single right-click actions.
     * @private
     */
    private _handleClickRight;
    /**
     * Handle double right-click actions.
     * @private
     */
    private _handleClickRight2;
    /**
     * Handle mouse movement during a drag workflow
     * @private
     */
    private _handleMouseMove;
    /**
     * Handle the beginning of a new drag start workflow, moving all controlled objects on the layer
     * @private
     */
    private _handleDragStart;
    /**
     * Handle the continuation of a drag workflow, moving all controlled objects on the layer
     * @private
     */
    private _handleDragMove;
    /**
     * Handle mouse up events which may optionally conclude a drag workflow
     * @private
     */
    private _handleMouseUp;
    /**
     * Handle the conclusion of a drag workflow, placing all dragged objects back on the layer
     * @private
     */
    private _handleDragDrop;
    /**
     * Handle the cancellation of a drag workflow, resetting back to the original state
     * @param {PointerEvent} event
     * @private
     */
    private _handleDragCancel;
}
declare namespace MouseInteractionManager {
    const INTERACTION_STATES: {
        [x: string]: number;
    };
}
/**
 * A PIXI.Rectangle where the width and height are always positive and the x and y are always the top-left
 */
declare class NormalizedRectangle {
    constructor(x: any, y: any, width: any, height: any);
}
/**
 * An abstract pattern for defining an Application responsible for updating some object using an HTML form
 *
 * A few critical assumptions:
 * 1) This application is used to only edit one object at a time
 * 2) The template used contains one (and only one) HTML form as it's outer-most element
 * 3) This abstract layer has no knowledge of what is being updated, so the implementation must define _updateObject
 *
 * @extends {Application}
 * @abstract
 * @interface
 *
 * @param object {*}                    Some object or entity which is the target to be updated.
 * @param [options] {Object}            Additional options which modify the rendering of the sheet.
 */
declare class FormApplication extends Application {
    /**
     * Assign the default options which are supported by the entity edit sheet.
     * In addition to the default options object supported by the parent Application class, the Form Application
     * supports the following additional keys and values:
     *
     * @returns {Object} options                    The default options for this FormApplication class, see Application
     * @returns {boolean} options.closeOnSubmit     Whether to automatically close the application when it's contained
     *                                              form is submitted. Default is true.
     * @returns {boolean} options.submitOnChange    Whether to automatically submit the contained HTML form when an input
     *                                              or select element is changed. Default is false.
     * @returns {boolean} options.submitOnClose     Whether to automatically submit the contained HTML form when the
     *                                              application window is manually closed. Default is false.
     * @returns {boolean} options.editable          Whether the application form is editable - if true, it's fields will
     *                                              be unlocked and the form can be submitted. If false, all form fields
     *                                              will be disabled and the form cannot be submitted. Default is true.
     */
    static get defaultOptions(): any;
    /**
     * @deprecated since 0.7.2
     * @see {@link FormDataExtended}
     */
    static processForm(formElement: any): any;
    constructor(object?: {}, options?: {});
    /**
     * The object target which we are using this form to modify
     * @type {*}
     */
    object: any;
    /**
     * A convenience reference to the form HTMLElement
     * @type {HTMLElement}
     */
    form: HTMLElement;
    /**
     * Keep track of any FilePicker instances which are associated with this form
     * The values of this Array are inner-objects with references to the FilePicker instances and other metadata
     * @type {FilePicker[]}
     */
    filepickers: FilePicker[];
    /**
     * Keep track of any mce editors which may be active as part of this form
     * The values of this Array are inner-objects with references to the MCE editor and other metadata
     * @type {Object}
     */
    editors: any;
    /**
     * Is the Form Application currently editable?
     * @type {boolean}
     */
    get isEditable(): boolean;
    /**
     * If the form is not editable, disable its input fields
     * @param form {HTMLElement}
     * @private
     */
    private _disableFields;
    /**
     * The options for submission
     * @typedef {Object} _onSubmit~Options
     * @property {Object|null} [options.updateData]    Additional specific data keys/values which override or extend the contents of
     *                                                 the parsed form. This can be used to update other flags or data fields at the
     *                                                 same time as processing a form submission to avoid multiple database operations.
     * @property {boolean} [options.preventClose]      Override the standard behavior of whether to close the form on submit
     * @property {boolean} [options.preventRender]     Prevent the application from re-rendering as a result of form submission
     * @returns {Promise}                              A promise which resolves to the validated update data
     */
    /**
     * Handle standard form submission steps
     * @param {Event} event                         The submit event which triggered this handler
     * @param {_onSubmit~Options}    The options for submission.
     * @private
     */
    private _onSubmit;
    _submitting: boolean;
    /**
     * Get an object of update data used to update the form's target object
     * @param {object} updateData     Additional data that should be merged with the form data
     * @return {object}               The prepared update data
     * @private
     */
    private _getSubmitData;
    /**
     * Handle changes to an input element, submitting the form if options.submitOnChange is true.
     * Do not preventDefault in this handler as other interactions on the form may also be occurring.
     * @param {Event} event  The initial change event
     * @private
     */
    private _onChangeInput;
    /**
     * Handle the change of a color picker input which enters it's chosen value into a related input field
     * @private
     */
    private _onChangeColorPicker;
    /**
     * Handle changes to a range type input by propagating those changes to the sibling range-value element
     * @param {Event} event  The initial change event
     * @private
     */
    private _onChangeRange;
    /**
     * This method is called upon form submission after form data is validated
     * @param event {Event}                  The initial triggering submission event
     * @param formData {Object}              The object of validated form data with which to update the object
     * @returns {Promise<FormApplication>}   A Promise which resolves once the update operation has completed
     * @abstract
     */
    _updateObject(event: Event, formData: any): Promise<FormApplication>;
    /**
     * Activate a named TinyMCE text editor
     * @param {string} name             The named data field which the editor modifies.
     * @param {object} options          TinyMCE initialization options passed to TextEditor.create
     * @param {string} initialContent   Initial text content for the editor area.
     */
    activateEditor(name: string, options?: object, initialContent?: string): void;
    saveEditor(name: any): Promise<any>;
    /**
     * Activate a TinyMCE editor instance present within the form
     * @param div {HTMLElement}
     * @private
     */
    private _activateEditor;
    /**
     * Activate a FilePicker instance present within the form
     * @param button {HTMLElement}
     * @private
     */
    private _activateFilePicker;
    /**
     * Submit the contents of a Form Application, processing its content as defined by the Application
     * @param {Object} [options]              Options passed to the _onSubmit event handler
     * @returns {Promise<FormApplication>}    Return a self-reference for convenient method chaining
     */
    submit(options?: any): Promise<FormApplication>;
    /**
     * @deprecated since 0.7.3
     * @see {@link FormApplication#activateEditor}
     */
    _createEditor(...args: any[]): void;
}
/**
 * The base PlaceablesLayer subclass of CanvasLayer
 * @type {CanvasLayer}
 * @abstract
 * @interface
 */
declare class PlaceablesLayer extends CanvasLayer {
    /**
     * Customize behaviors of this PlaceablesLayer by modifying some behaviors at a class level
     * @static
     * @type {Object} layerOptions
     *
     * @property {boolean} layerOptions.canDragCreate        Does this layer support a mouse-drag workflow to create new objects?
     * @property {boolean} layerOptions.controllableObjects  Can placeable objects in this layer be controlled?
     * @property {boolean} layerOptions.rotatableObjects     Can placeable objects in this layer be rotated?
     * @property {boolean} layerOptions.snapToGrid           Do objects in this layer snap to the grid
     * @property {number} layerOptions.gridPrecision         At what numeric grid precision do objects snap?
     */
    static get layerOptions(): any;
    /**
     * Return a reference to the active instance of this canvas layer
     * @static
     * @type {PlaceablesLayer}
     */
    static get instance(): PlaceablesLayer;
    /**
     * Define the named Array within Scene.data containing the placeable objects displayed in this layer
     * @static
     * @type {string}
     */
    static get dataArray(): string;
    /**
     * Define a Container implementation used to render placeable objects contained in this layer
     * @static
     * @type {PIXI.Container}
     */
    static get placeableClass(): any;
    /**
     * Placeable Layer Objects
     * @type {PIXI.Container}
     */
    objects: any;
    /**
     * Preview Object Placement
     */
    preview: any;
    /**
     * Keep track of history so that CTRL+Z can undo changes
     * @type {object[]}
     */
    history: object[];
    /**
     * Track the PlaceableObject on this layer which is currently being hovered upon
     * @type {PlaceableObject}
     */
    _hover: PlaceableObject;
    /**
     * Track the set of PlaceableObjects on this layer which are currently controlled by their id
     * @type {Object}
     */
    _controlled: {};
    /**
     * Keep track of an object copied with CTRL+C which can be pasted later
     * @type {object[]}
     */
    _copy: PlaceableObject[];
    /**
     * PlaceableObject layer options
     * @type {Object}
     */
    options: any;
    /**
     * A Quadtree which partitions and organizes Walls into quadrants for efficient target identification.
     * @type {Quadtree|null}
     */
    quadtree: Quadtree | null;
    /**
     * Return the precision relative to the Scene grid with which Placeable objects should be snapped
     * @return {number}
     */
    get gridPrecision(): number;
    /**
     * If objects on this PlaceableLayer have a HUD UI, provide a reference to its instance
     * @type {BasePlaceableHUD|null}
     */
    get hud(): BasePlaceableHUD;
    /**
     * A convenience method for accessing the placeable object instances contained in this layer
     * @type {PlaceableObject[]}
     */
    get placeables(): PlaceableObject[];
    /**
     * An Array of placeable objects in this layer which have the _controlled attribute
     * @return {PlaceableObject[]}
     */
    get controlled(): PlaceableObject[];
    /**
     * Draw a single placeable object
     * @return {PlaceableObject}
     */
    createObject(data: any): PlaceableObject;
    /**
     * Get a PlaceableObject contained in this layer by it's ID
     * @param {string} objectId   The ID of the contained object to retrieve
     * @return {PlaceableObject}  The object instance, or undefined
     */
    get(objectId: string): PlaceableObject;
    /**
     * Acquire control over all PlaceableObject instances which are visible and controllable within the layer.
     * @param {object} options   Options passed to the control method of each object
     */
    controlAll(options?: object): void;
    /**
     * Release all controlled PlaceableObject instance from this layer.
     * @param {object} options   Options passed to the release method of each object
     * @returns {number}         The number of PlaceableObject instances which were released
     */
    releaseAll(options?: object): number;
    /**
     * Simultaneously rotate multiple PlaceableObjects using a provided angle or incremental.
     * This executes a single database operation using Scene.update.
     * If rotating only a single object, it is better to use the PlaceableObject.rotate instance method.
     *
     * @param {Object} [options]           The options for rotating PlaceableObjects
     * @param {number} [options.angle]     A target angle of rotation (in degrees) where zero faces "south"
     * @param {number} [options.delta]     An incremental angle of rotation (in degrees)
     * @param {number} [options.snap]      Snap the resulting angle to a multiple of some increment (in degrees)
     * @param {Array|Set} [options.ids]    An Array or Set of object IDs to target for rotation
  
     * @return {Promise}                   The resulting Promise from the Scene.update operation
     */
    rotateMany({ angle, delta, snap, ids }?: {
        angle: number;
        delta: number;
        snap: number;
        ids: any[] | Set<any>;
    }): Promise<any>;
    /**
     * Simultaneously move multiple PlaceableObjects via keyboard movement offsets.
     * This executes a single database operation using Scene.update.
     * If moving only a single object, this will delegate to PlaceableObject.update for performance reasons.
     *
     * @param {Object} [options]            The options to move PlaceableObjects.
     * @param {number} [options.dx]         The number of incremental grid units in the horizontal direction
     * @param {number} [options.dy]         The number of incremental grid units in the vertical direction
     * @param {boolean} [options.rotate]    Rotate the token to the keyboard direction instead of moving
     * @param {Array|Set} [options.ids]     An Array or Set of object IDs to target for rotation
     *
     * @return {Promise}          The resulting Promise from the Scene.update operation
     */
    moveMany({ dx, dy, rotate, ids }?: {
        dx: number;
        dy: number;
        rotate: boolean;
        ids: any[] | Set<any>;
    }): Promise<any>;
    /**
     * Undo a change to the objects in this layer
     * This method is typically activated using CTRL+Z while the layer is active
     * @return {Promise}
     */
    undoHistory(): Promise<any>;
    /**
     * Create multiple embedded entities in a parent Entity collection using an Array of provided data
     *
     * @param {object[]} data       An Array of update data Objects which provide incremental data
     * @param {object} options      Additional options which customize the update workflow
     *
     * @return {Promise<object[]>}  A Promise which resolves to the returned socket response (if successful)
     */
    createMany(data: object[], options?: object): Promise<object[]>;
    /**
     * Update multiple embedded entities in a parent Entity collection using an Array of provided data
     *
     * @param {object[]} data       An Array of update data Objects which provide incremental data
     * @param {object} options      Additional options which customize the update workflow
     *
     * @return {Promise<object[]>}  A Promise which resolves to the returned socket response (if successful)
     */
    updateMany(data: object[], options?: object): Promise<object[]>;
    /**
     * Simultaneously delete multiple PlaceableObjects.
     * This executes a single database operation using Scene.update.
     * If deleting only a single object, this will delegate to PlaceableObject.delete for performance reasons.
     *
     * @param {string[]} ids        An Array of object IDs to target for deletion
     * @param {object} options      Additional options which customize the update workflow
     *
     * @return {Promise<string[]>}  A Promise which resolves to the returned socket response (if successful)
     */
    deleteMany(ids: string[], options?: object): Promise<string[]>;
    /**
     * A helper method to prompt for deletion of all PlaceableObject instances within the Scene
     * Renders a confirmation dialogue to confirm with the requester that all objects will be deleted
     */
    deleteAll(): Promise<any>;
    /**
     * Record a new CRUD event in the history log so that it can be undone later
     * @param {string} type   The event type (create, update, delete)
     * @param {Object} data   The object data
     */
    storeHistory(type: string, data: any): void;
    /**
     * Copy currently controlled PlaceableObjects to a temporary Array, ready to paste back into the scene later
     * @returns {PlaceableObject[]}             The Array of copied PlaceableObject instances
     */
    copyObjects(): PlaceableObject[];
    /**
     * Paste currently copied PlaceableObjects back to the layer by creating new copies
       * @param {Point} position                  The destination position for the copied data.
       * @param {Object}  [options]               The options for pasting PlaceableObjects.
       * @param {boolean} [options.hidden]        Paste data in a hidden state, if applicable. Default is false.
       * @param {boolean} [options.snap]          Snap the resulting objects to the grid. Default is true.
     * @return {Promise.<PlaceableObject[]>}    An Array of created PlaceableObject instances
     */
    pasteObjects(position: Point, { hidden, snap }?: {
        hidden: boolean;
        snap: boolean;
    }): Promise<PlaceableObject[]>;
    /**
     * Select all PlaceableObject instances which fall within a coordinate rectangle.
     *
     * @param {Object} [options]                   The options to select PlaceableObjects.
       * @param {number} [options.x]                 The top-left x-coordinate of the selection rectangle
       * @param {number} [options.y]                 The top-left y-coordinate of the selection rectangle
       * @param {number} [options.width]             The width of the selection rectangle
       * @param {number} [options.height]            The height of the selection rectangle
       * @param {Object} [options.releaseOptions]    Optional arguments provided to any called release() method
       * @param {Object} [options.controlOptions]    Optional arguments provided to any called control() method
       * @return {boolean}                           A boolean for whether the controlled set was changed in the operation
     */
    selectObjects({ x, y, width, height, releaseOptions, controlOptions }?: {
        x: number;
        y: number;
        width: number;
        height: number;
        releaseOptions: any;
        controlOptions: any;
    }): boolean;
    /**
     * Handle left mouse-click events which originate from the Canvas stage and are dispatched to this Layer.
     * @see {Canvas#_onClickLeft}
     */
    _onClickLeft(event: any): void;
    /**
     * Handle double left-click events which originate from the Canvas stage and are dispatched to this Layer.
     * @see {Canvas#_onClickLeft2}
     */
    _onClickLeft2(event: any): void;
    /**
     * Start a left-click drag workflow originating from the Canvas stage.
     * @see {Canvas#_onDragLeftStart}
     */
    _onDragLeftStart(event: any): void;
    /**
     * Continue a left-click drag workflow originating from the Canvas stage.
     * @see {Canvas#_onDragLeftMove}
     */
    _onDragLeftMove(event: any): void;
    /**
     * Conclude a left-click drag workflow originating from the Canvas stage.
     * @see {Canvas#_onDragLeftDrop}
     */
    _onDragLeftDrop(event: any): void;
    /**
     * Cancel a left-click drag workflow originating from the Canvas stage.
     * @see {Canvas#_onDragLeftDrop}
     */
    _onDragLeftCancel(event: any): void;
    /**
     * Handle right mouse-click events which originate from the Canvas stage and are dispatched to this Layer.
     * @see {Canvas#_onClickRight}
     */
    _onClickRight(event: any): void;
    /**
     * Handle mouse-wheel events at the PlaceableObjects layer level to rotate multiple objects at once.
     * This handler will rotate all controlled objects by some incremental angle.
     * @param {MouseWheelEvent} event   The mousewheel event which originated the request
     */
    _onMouseWheel(event: MouseWheelEvent): Promise<any>;
    /**
     * Handle a DELETE keypress while a placeable object is hovered
     * @param {Event} event    The delete key press event which triggered the request
     * @private
     */
    private _onDeleteKey;
}
/**
 * The Compendium class provides an interface for interacting with compendium packs which are
 * collections of similar Entities which are stored outside of the world database but able to
 * be easily imported into an active session.
 *
 * When the game session is initialized, each available compendium pack is constructed and
 * added to the ``game.packs``.
 *
 * Each Compendium is distinctly referenced using its canonical "collection" name which is a
 * unique string that contains the package name which provides the compendium as well as the
 * name of the pack within that package. For example, in the DnD5e system, the compendium pack
 * which provides the spells available within the SRD has the collection name "dnd5e.spells".
 *
 * @type {Application}
 *
 * @param metadata {Object}   The compendium metadata, an object provided by game.data
 * @param options {Object}    Application rendering options
 *
 * @example
 * // Let's learn the collection names of all the compendium packs available within a game
 * game.packs.keys();
 *
 * // Suppose we are working with a particular pack named "dnd5e.spells"
 * const pack = game.packs.get("dnd5e.spells");
 *
 * // We can load the index of the pack which contains all entity IDs, names, and image icons
 * pack.getIndex().then(index => console.log(index));
 *
 * // We can find a specific entry in the compendium by its name
 * let entry = pack.index.find(e => e.name === "Acid Splash");
 *
 * // Given the entity ID of "Acid Splash" we can load the full Entity from the compendium
 * pack.getEntity(entry.id).then(spell => console.log(spell));
 *
 * @example
 * // We often may want to programmatically create new Compendium content
 * // Let's start by creating a custom spell as an Item instance
 * let itemData = {name: "Custom Death Ray", type: "Spell"};
 * let item = new Item(itemData);
 *
 * // Once we have an entity for our new Compendium entry we can import it, if the pack is unlocked
 * pack.importEntity(item);
 *
 * // When the entity is imported into the compendium it will be assigned a new ID, so let's find it
 * pack.getIndex().then(index => {
 *   let entry = index.find(e => e.name === itemData.name));
 *   console.log(entry);
 * });
 *
 * // If we decide to remove an entry from the compendium we can do that by the entry ID
 * pack.removeEntry(entry.id);
 */
declare class Compendium extends Application {
    /** @override */
    static get defaultOptions(): any;
    /**
     * Create a new Compendium pack using provided
     * @param {Object} metadata      The compendium metadata used to create the new pack
     * @param {Options} [options]    Additional options which modify the Compendium creation request
     * @return {Promise.<Compendium>}
     */
    static create(metadata: any, options?: Options): Promise<Compendium>;
    constructor(metadata: any, options: any);
    /**
     * The compendium metadata which defines the compendium content and location
     * @type {Object}
     */
    metadata: any;
    /**
     * Track whether the compendium pack is locked for editing
     * @type {boolean}
     */
    locked: boolean;
    /**
     * Track whether the compendium pack is private
     * @type {boolean}
     */
    private: boolean;
    /**
     * The most recently retrieved index of the Compendium content
     * This index is not guaranteed to be current - call getIndex() to reload the index
     * @type {object[]}
     */
    index: any;
    /**
     * The canonical Compendium name - comprised of the originating package and the pack name
     * @return {string}     The canonical collection name
     */
    get collection(): string;
    /**
     * The Entity type which is allowed to be stored in this collection
     * @type {string}
     */
    get entity(): string;
    /**
     * A reference to the Entity class object contained within this Compendium pack
     * @return {*}
     */
    get cls(): any;
    /**
     * Assign configuration metadata settings to the compendium pack
     * @param {Object} settings   The object of compendium settings to define
     * @return {Promise}          A Promise which resolves once the setting is updated
     */
    configure(settings?: any): Promise<any>;
    /**
     * Delete a world Compendium pack
     * This is only allowed for world-level packs by a GM user
     * @return {Promise.<Compendium>}
     */
    delete(): Promise<Compendium>;
    /**
     * Duplicate a compendium pack to the current World
     * @param label
     * @return {Promise<Compendium>}
     */
    duplicate({ label }?: {
        label: any;
    }): Promise<Compendium>;
    /**
     * Get the Compendium index
     * Contains names and IDs of all data in the compendium
     *
     * @return {Promise}    A Promise containing an index of all compendium entries
     */
    getIndex(): Promise<any>;
    /**
     * Get the complete set of content for this compendium, loading all entries in full
     * Returns a Promise that resolves to an Array of entries
     *
     * @return {Promise.<Array>}
     */
    getContent(): Promise<any[]>;
    /**
     * Get a single Compendium entry as an Object
     * @param {string} entryId          The compendium entry ID to retrieve
     * @return {Promise.<Object|null>}  A Promise containing the return entry data, or null
     */
    getEntry(entryId: string): Promise<any | null>;
    /**
     * Get a single Compendium entry as an Entity instance
     * @param {string} entryId          The compendium entry ID to load and instantiate
     * @return {Promise.<Entity|null>}   A Promise containing the returned Entity, if it exists, otherwise null
     */
    getEntity(entryId: string): Promise<Entity | null>;
    /**
     * Fully import the contents of a Compendium pack into a World folder.
       * @param {Object} [options]                The optoins for importing a compendium.
       * @param {string|null} [options.folderId]  An existing Folder _id to use.
       * @param {string} [options.folderName]     A new Folder name to create.
     * @return {Promise<*>}
     */
    importAll({ folderId, folderName }?: {
        folderId?: string | null;
        folderName?: string;
    }): Promise<any>;
    /**
     * Cast entry data to an Entity class
     * @param {Object} entryData
     * @private
     */
    private _toEntity;
    /**
     * Import a new Entity into a Compendium pack
     * @param {Entity} entity     The Entity instance you wish to import
     * @return {Promise}          A Promise which resolves to the created Entity once the operation is complete
     */
    importEntity(entity: Entity): Promise<any>;
    /**
     * Create a new Entity within this Compendium Pack using provided data
     * @param {Object} data          Data with which to create the entry
     * @param {Options} [options]    Additional options which modify the creation
     * @return {Promise}             A Promise which resolves to the created Entity once the operation is complete
     */
    createEntity(data: any, options?: Options): Promise<any>;
    /**
     * Update a single Compendium entry programmatically by providing new data with which to update
     * @param {Object} data       The incremental update with which to update the Entity. Must contain the _id
     * @param {Object} options    Additional options which modify the update request
     * @return {Promise}          A Promise which resolves with the updated Entity once the operation is complete
     */
    updateEntity(data: any, options?: any): Promise<any>;
    /**
     * Delete a single Compendium entry by its provided _id
     * @param {string} id         The entry ID to delete
     * @param {Object} options    Additional options which modify the deletion request
     * @return {Promise}          A Promise which resolves to the deleted entry ID once the operation is complete
     */
    deleteEntity(id: string, options?: any): Promise<any>;
    /**
     * Request that a Compendium pack be migrated to the latest System data template
     * @return {Promise.<Compendium>}
     */
    migrate(options: any): Promise<Compendium>;
    /**
     * Validate that the current user is able to modify content of this Compendium pack
     * @return {boolean}
     * @private
     */
    private _assertUserCanModify;
    /**
     * Handle opening a single compendium entry by invoking the configured entity class and its sheet
     * @param {string} entryId      The compendium ID of the entry to display
     * @private
     */
    private _onEntry;
    /**
     * Render the ContextMenu which applies to each compendium entry
     * @private
     */
    private _contextMenu;
}
declare namespace Compendium {
    const CONFIG_SETTING: string;
}
/**
 * Extend the FormApplication pattern to incorporate specific logic for viewing or editing Entity instances.
 * See the FormApplication documentation for more complete description of this interface.
 *
 * @extends {FormApplication}
 * @abstract
 * @interface
 *
 * @param {Entity} object                           An Entity which should be managed by this form sheet.
 * @param {Object} [options]                        Optional configuration parameters for how the form behaves.
 */
declare class BaseEntitySheet extends FormApplication {
    constructor(object: any, options: any);
    /**
     * A convenience accessor for the object property, which in the case of a BaseEntitySheet is an Entity instance.
     * @type {Entity}
     */
    get entity(): Entity;
}
/**
 * The Folder Entity
 * @extends {Entity}
 */
declare class Folder extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof Folder;
        collection: any;
        embeddedEntities: {};
        label: string;
    };
    /**
     * Create a new Folder by rendering a dialog window to provide basic creation details
     * @param {object} data       Initial data with which to populate the creation form
     * @param {object} options    Initial positioning and sizing options for the dialog form
     * @return {FolderConfig}     An active FolderConfig instance for creating the new Folder entity
     */
    static createDialog(data?: object, options?: object): FolderConfig;
    /** @override */
    static _handleDelete({ request, result, userId }: {
        request: any;
        result: any;
        userId: any;
    }): Collection;
    constructor(data: any, options: any);
    /**
     * Return whether the folder is displayed in the sidebar to the current user
     * @type {boolean}
     */
    get displayed(): boolean;
    /**
     * Return whether the folder is currently expanded within the sidebar interface
     * @type {boolean}
     */
    get expanded(): boolean;
    /**
     * A reference to the parent Folder if one is set, otherwise null
     * @type {Folder|null}
     */
    get parent(): Folder;
    /**
     * Return the named Entity type for elements in this folder.
     * @return {string}
     */
    get type(): string;
    /**
     * Return an Array of the Entities which are contained within this Folder
     * @type {Entity[]}
     */
    get entities(): Entity[];
    /**
     * Export all Entities contained in this Folder to a given Compendium pack.
     * Optionally update existing Entities within the Pack by name, otherwise append all new entries.
     * @param {Compendium} pack                   A Compendium pack to which the entities will be exported
     * @param {Object} [options]                  The options for exporting a compendium
     * @param {boolean} [options.updateByName]    Update existing entries in the Compendium pack, matching by name
     * @return {Promise.<Compendium>}             The updated Compendium Pack
     */
    exportToCompendium(pack: Compendium, { updateByName }?: {
        updateByName: boolean;
    }): Promise<Compendium>;
}
/**
 * An iterable container of Entity objects within the Foundry Virtual Tabletop framework.
 * Each Entity type has it's own subclass of EntityCollection, which defines the abstract interface.
 * @abstract
 * @interface
 * @extends {Collection}
 *
 * @param {object[]} data      An Array of Entity data from which to create instances
 */
declare class EntityCollection extends Collection {
    /**
     * Return a reference to the singleton instance of this EntityCollection, or null if it has not yet been created.
     * @type {EntityCollection|null}
     */
    static get instance(): EntityCollection;
    constructor(data: any);
    /**
     * The source data is, itself, a mapping of IDs to data objects
     * @type {object[]}
     */
    _source: object[];
    /**
     * An Array of application references which will be automatically updated when the collection content changes
     * @type {Application[]}
     */
    apps: Application[];
    /**
     * Initialize the Map object and all its contained entities
     * @param {Entity[]} data
     * @private
     */
    private _initialize;
    /**
     * An array of all the Entities in the EntityCollection.
     * @alias {Collection#entries}
     * @return {Entity[]}
     */
    get entities(): Entity[];
    /**
     * Render any Applications associated with this EntityCollection
     * @return {Application}    A reference to the rendered EntityCollection
     */
    render(...args: any[]): Application;
    /**
     * The EntityCollection name
     * @type {string}
     */
    get name(): string;
    /**
     * Return a reference to the SidebarDirectory application for this EntityCollection, or null if it has not yet been created.
     * @type {SidebarDirectory|null}
     */
    get directory(): SidebarDirectory;
    /**
     * Return a reference to the base Entity name which is contained within this EntityCollection.
     * @type {string}
     * @abstract
     */
    get entity(): string;
    /**
     * Return a reference to the Entity subclass which should be used when creating elements of this EntityCollection.
     * This should always be an explicit reference to the class which is used in this game to represent the entity,
     * and not the base implementation of that entity type.
     * @type {Entity}
     */
    get object(): Entity;
    /**
     * Add a new Entity to the EntityCollection, asserting that they are of the correct type.
     * @param entity {Entity}   The entity instance to add to the collection
     */
    insert(entity: Entity): void;
    /**
     * Remove an Entity from the EntityCollection by its ID.
     * @param id {string}   The entity ID which should be removed
     */
    remove(id: string): void;
    /**
     * Import an Entity from a compendium collection, adding it to the current World.
     * @param {string} collection     The name of the pack from which to import
     * @param {string} entryId        The ID of the compendium entry to import
     * @param {Object} [updateData]   Optional additional data used to modify the imported Entity before it is created
     * @param {Object} [options]      Optional arguments passed to the Entity.create method
     * @return {Promise.<Entity>}     A Promise containing the imported Entity
     */
    importFromCollection(collection: string, entryId: string, updateData?: any, options?: any): Promise<Entity>;
    /**
     * Apply data transformations when importing an Entity from a Compendium pack
     * @param {Object} data           The original Compendium entry data
     * @return {Object}               The processed data ready for Entity creation
     */
    fromCompendium(data: any): any;
}
/**
 * An abstract class implementation for an EmbeddedEntity object within a parent Entity
 * @abstract
 * @interface
 */
declare class EmbeddedEntity {
    constructor(data: any, parent: any);
    /**
     * The embedded entity data object
     * @type {Data}
     */
    data: Data;
    /**
     * The parent Entity to which this belongs
     * @type {Entity}
     */
    parent: Entity;
    /**
     * A reference to the _id attribute of the EmbeddedEntity data
     * @type {string}
     */
    get id(): string;
    /**
     * Data preparation steps taken by the EmbeddedEntity instance when it's underlying data changes
     */
    prepareData(): void;
}
/**
 * The JournalEntry class
 * @extends {Entity}
 */
declare class JournalEntry extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof JournalEntry;
        collection: any;
        embeddedEntities: {};
        label: string;
        permissions: {
            create: string;
        };
    };
    constructor(data: any, options: any);
    /**
     * Return a reference to the Note instance for this JournalEntry in the current Scene, if any
     * @type {Note}
     */
    get sceneNote(): Note;
    /**
     * Show the JournalEntry to connected players.
     * By default the entry will only be shown to players who have permission to observe it.
     * If the parameter force is passed, the entry will be shown to all players regardless of normal permission.
     *
     * @param {string} mode     Which JournalEntry mode to display? Default is text.
     * @param {boolean} force   Display the entry to all players regardless of normal permissions
     * @return {Promise}        A Promise that resolves back to the shown entry once the request is processed
     */
    show(mode?: string, force?: boolean): Promise<any>;
    /**
     * If the JournalEntry has a pinned note on the canvas, this method will animate to that note
     * The note will also be highlighted as if hovered upon by the mouse
     */
    panToNote({ scale, duration }?: {
        scale?: number;
        duration?: number;
    }): void;
}
/**
 * The Playlist Entity.
 * Each Playlist is a collection of Sounds which are used to provide background music and sound effects.
 * @extends {Entity}
 */
declare class Playlist extends Entity {
    /** @override */
    static get config(): {
        baseEntity: typeof Playlist;
        collection: any;
        embeddedEntities: {
            PlaylistSound: string;
        };
        label: string;
    };
    constructor(...args: any[]);
    /**
     * Each sound which is played within the Playlist has a created Howl instance.
     * The keys of this object are the sound IDs and the values are the Howl instances.
     * @type {Object}
     */
    audio: any;
    /**
     * Playlists may have a playback order which defines the sequence of Playlist Sounds
     * @type {string[]}
     */
    playbackOrder: string[];
    /**
     * Set up the Howl object by calling the core AudioHelper utility
     * @param {Object} sound    The PlaylistSound for which to create an audio object
     * @return {Object}         The created audio object
     * @private
     */
    private _createAudio;
    /**
     * This callback triggers whenever a sound concludes playback
     * Mark the concluded sound as no longer playing and possibly trigger playback for a subsequent sound depending on
     * the playlist mode.
     *
     * @param {string} soundId  The sound ID of the track which is ending playback
     * @private
     */
    private _onEnd;
    /**
     * Generate a new playback order for the playlist.
     * Use a seed for randomization to (hopefully) guarantee that all clients generate the same random order.
     * The seed is based on the first 9 characters of the UTC datetime multiplied by the index order of the playlist.
     * @private
     */
    private _getPlaybackOrder;
    /**
     * Get the next sound which should be played in the Playlist after the current sound completes
     * @param {string} soundId    The ID of the currently playing sound
     * @return {Object}           The sound data for the next sound to play
     * @private
     */
    private _getNextSound;
    /**
     * An Array of the sound data contained within this Playlist entity
     * @type {object[]}
     */
    get sounds(): any[];
    /**
     * The playback mode for the Playlist instance
     * @type {number}
     */
    get mode(): number;
    /**
     * An indicator for whether any Sound within the Playlist is currently playing
     * @type {boolean}
     */
    get playing(): boolean;
    /**
     * Play (or stop) a single sound from the Playlist
     * @param sound {Object}       The sound object to begin playback
     */
    playSound(sound: any): void;
    /**
     * Begin simultaneous playback for all sounds in the Playlist
     * @return {Promise.<Playlist>}    A Promise which resolves once the Playlist update is complete
     */
    playAll(): Promise<Playlist>;
    /**
     * End playback for any/all currently playing sounds within the Playlist
     * @return {Promise}    A Promise which resolves once the Playlist update is complete
     */
    stopAll(): Promise<any>;
    /**
     * Cycle the playlist mode
     * @return {Promise.<Playlist>}   A promise which resolves to the updated Playlist instance
     */
    cycleMode(): Promise<Playlist>;
}
/**
 * The standard application window that is rendered for a large variety of UI elements in Foundry VTT.
 * @interface
 *
 * @param {Object} options                      Configuration options which control how the application is rendered.
 *                                              Application subclasses may add additional supported options, but the
 *                                              following configurations are supported for all Applications. The values
 *                                              passed to the constructor are combined with the defaultOptions defined
 *                                              at the class level.
 * @param {string} [options.baseApplication]    A named "base application" which generates an additional hook
 * @param {number} [options.width]              The default pixel width for the rendered HTML
 * @param {number} [options.height]             The default pixel height for the rendered HTML
 * @param {number} [options.top]                The default offset-top position for the rendered HTML
 * @param {number} [options.left]               The default offset-left position for the rendered HTML
 * @param {boolean} [options.popOut]            Whether to display the application as a pop-out container
 * @param {boolean} [options.minimizable]       Whether the rendered application can be minimized (popOut only)
 * @param {boolean} [options.resizable]         Whether the rendered application can be drag-resized (popOut only)
 * @param {string} [options.id]                 The default CSS id to assign to the rendered HTML
 * @param {string[]} [options.classes]          An array of CSS string classes to apply to the rendered HTML
 * @param {string} [options.title]              A default window title string (popOut only)
 * @param {string} [options.template]           The default HTML template path to render for this Application
 * @param {string[]} [options.scrollY]          A list of unique CSS selectors which target containers that should
 *                                              have their vertical scroll positions preserved during a re-render.
 *
 * Hooks:
 *   renderApplication
 *   closeApplication
 *   getApplicationHeaderButtons
 */
declare class Application {
    /**
     * Assign the default options configuration which is used by this Application class. The options and values defined
     * in this object are merged with any provided option values which are passed to the constructor upon initialization.
     * Application subclasses may include additional options which are specific to their usage.
     */
    static get defaultOptions(): {
        baseApplication: any;
        width: any;
        height: any;
        top: any;
        left: any;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        classes: any[];
        dragDrop: any[];
        tabs: any[];
        filters: any[];
        title: string;
        template: any;
        scrollY: any[];
    };
    /**
     * Return the inheritance chain for this Application class up to (and including) it's base Application class.
     * @return {Application[]}
     * @private
     */
    private static _getInheritanceChain;
    constructor(options?: {});
    /**
     * The options provided to this application upon initialization
     * @type {Object}
     */
    options: any;
    /**
     * The application ID is a unique incrementing integer which is used to identify every application window
     * drawn by the VTT
     * @type {number}
     */
    appId: number;
    /**
     * An internal reference to the HTML element this application renders
     * @type {jQuery}
     */
    _element: typeof jQuery;
    /**
     * Track the current position and dimensions of the Application UI
     * @type {Object}
     */
    position: any;
    /**
     * DragDrop workflow handlers which are active for this Application
     * @type {DragDrop[]}
     */
    _dragDrop: DragDrop[];
    /**
     * Tab navigation handlers which are active for this Application
     * @type {Tabs[]}
     */
    _tabs: Tabs[];
    /**
     * SearchFilter handlers which are active for this Application
     * @type {SearchFilter[]}
     */
    _searchFilters: SearchFilter[];
    /**
     * Track whether the Application is currently minimized
     * @type {boolean}
     * @private
     */
    private _minimized;
    /**
     * Track the render state of the Application
     * @see {Application.RENDER_STATES}
     * @type {number}
     * @private
     */
    private _state;
    /**
     * Track the most recent scroll positions for any vertically scrolling containers
     * @type {Object|null}
     */
    _scrollPositions: any | null;
    /**
     * Create drag-and-drop workflow handlers for this Application
     * @return {DragDrop[]}     An array of DragDrop handlers
     * @private
     */
    private _createDragDropHandlers;
    /**
     * Create tabbed navigation handlers for this Application
     * @return {Tabs[]}     An array of Tabs handlers
     * @private
     */
    private _createTabHandlers;
    /**
     * Create search filter handlers for this Application
     * @return {SearchFilter[]}  An array of SearchFilter handlers
     * @private
     */
    private _createSearchFilters;
    /**
     * Return the CSS application ID which uniquely references this UI element
     */
    get id(): any;
    /**
     * Return the active application element, if it currently exists in the DOM
     * @type {jQuery|HTMLElement}
     */
    get element(): HTMLElement | typeof jQuery;
    /**
     * The path to the HTML template file which should be used to render the inner content of the app
     * @type {string}
     */
    get template(): string;
    /**
     * Control the rendering style of the application. If popOut is true, the application is rendered in its own
     * wrapper window, otherwise only the inner app content is rendered
     * @type {boolean}
     */
    get popOut(): boolean;
    /**
     * Return a flag for whether the Application instance is currently rendered
     * @type {boolean}
     */
    get rendered(): boolean;
    /**
     * An Application window should define its own title definition logic which may be dynamic depending on its data
     * @type {string}
     */
    get title(): string;
    /**
     * An application should define the data object used to render its template.
     * This function may either return an Object directly, or a Promise which resolves to an Object
     * If undefined, the default implementation will return an empty object allowing only for rendering of static HTML
     *
     * @return {Object|Promise}
     */
    getData(options?: {}): any | Promise<any>;
    /**
     * Render the Application by evaluating it's HTML template against the object of data provided by the getData method
     * If the Application is rendered as a pop-out window, wrap the contained HTML in an outer frame with window controls
     *
     * @param {boolean} force   Add the rendered application to the DOM if it is not already present. If false, the
     *                          Application will only be re-rendered if it is already present.
     * @param {Object} options  Additional rendering options which are applied to customize the way that the Application
     *                          is rendered in the DOM.
     *
     * @param {number} options.left           The left positioning attribute
     * @param {number} options.top            The top positioning attribute
     * @param {number} options.width          The rendered width
     * @param {number} options.height         The rendered height
     * @param {number} options.scale          The rendered transformation scale
     * @param {boolean} options.log           Whether to display a log message that the Application was rendered
     * @param {string} options.renderContext  A context-providing string which suggests what event triggered the render
     * @param {*} options.renderData          The data change which motivated the render request
     *
     */
    render(force?: boolean, options?: {
        left: number;
        top: number;
        width: number;
        height: number;
        scale: number;
        log: boolean;
        renderContext: string;
        renderData: any;
    }): Application;
    /**
     * An asynchronous inner function which handles the rendering of the Application
     * @param {boolean} force     Render and display the application even if it is not currently displayed.
     * @param {Object} options    Provided rendering options, see the render function for details
     * @return {Promise}
     * @private
     */
    private _render;
    /**
     * Persist the scroll positions of containers within the app before re-rendering the content
     * @param {jQuery} html           The HTML object being traversed
     * @param {string[]} selectors    CSS selectors which designate elements to save
     * @private
     */
    private _saveScrollPositions;
    /**
     * Restore the scroll positions of containers within the app after re-rendering the content
     * @param {jQuery} html           The HTML object being traversed
     * @param {string[]} selectors    CSS selectors which designate elements to restore
     * @private
     */
    private _restoreScrollPositions;
    /**
     * Render the outer application wrapper
     * @return {Promise.<HTMLElement>}   A promise resolving to the constructed jQuery object
     * @private
     */
    private _renderOuter;
    /**
     * Render the inner application content
     * @param {Object} data         The data used to render the inner template
     * @return {Promise.<jQuery>}   A promise resolving to the constructed jQuery object
     * @private
     */
    private _renderInner;
    /**
     * Customize how inner HTML is replaced when the application is refreshed
     * @param {HTMLElement|jQuery} element  The original HTML element
     * @param {HTMLElement|jQuery} html     New updated HTML
     * @private
     */
    private _replaceHTML;
    /**
     * Customize how a new HTML Application is added and first appears in the DOC
     * @param html {jQuery}
     * @private
     */
    private _injectHTML;
    /**
     * Specify the set of config buttons which should appear in the Application header.
     * Buttons should be returned as an Array of objects.
     * The header buttons which are added to the application can be modified by the getApplicationHeaderButtons hook.
     * @typedef {{label: string, class: string, icon: string, onclick: Function|null}} ApplicationHeaderButton
     * @fires Application#hook:getApplicationHeaderButtons
     * @return {ApplicationHeaderButton[]}
     * @private
     */
    private _getHeaderButtons;
    /**
     * Once the HTML for an Application has been rendered, activate event listeners which provide interactivity for
     * the application
     * @param html {jQuery}
     */
    activateListeners(html: typeof jQuery): void;
    /**
     * Handle changes to the active tab in a configured Tabs controller
     * @param {MouseEvent} event    A left click event
     * @param {Tabs} tabs           The Tabs controller
     * @param {string} active       The new active tab name
     * @private
     */
    private _onChangeTab;
    /**
     * Handle changes to search filtering controllers which are bound to the Application
     * @param {KeyboardEvent} event   The key-up event from keyboard input
     * @param {RegExp} query          The regular expression to test against
     * @param {HTMLElement} html      The HTML element which should be filtered
     * @private
     */
    private _onSearchFilter;
    /**
     * Define whether a user is able to begin a dragstart workflow for a given drag selector
     * @param {string} selector       The candidate HTML selector for dragging
     * @return {boolean}              Can the current user drag this selector?
     * @private
     */
    private _canDragStart;
    /**
     * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector
     * @param {string} selector       The candidate HTML selector for the drop target
     * @return {boolean}              Can the current user drop on this selector?
     * @private
     */
    private _canDragDrop;
    /**
     * Callback actions which occur at the beginning of a drag start workflow.
     * @param {DragEvent} event       The originating DragEvent
     * @private
     */
    private _onDragStart;
    /**
     * Callback actions which occur when a dragged element is over a drop target.
     * @param {DragEvent} event       The originating DragEvent
     * @private
     */
    private _onDragOver;
    /**
     * Callback actions which occur when a dragged element is dropped on a target.
     * @param {DragEvent} event       The originating DragEvent
     * @private
     */
    private _onDrop;
    /**
     * Bring the application to the top of the rendering stack
     */
    bringToTop(): void;
    /**
     * Close the application and un-register references to it within UI mappings
     * This function returns a Promise which resolves once the window closing animation concludes
     * @return {Promise}
     */
    close(): Promise<any>;
    /**
     * Minimize the pop-out window, collapsing it to a small tab
     * Take no action for applications which are not of the pop-out variety or apps which are already minimized
     * @return {Promise}    A Promise which resolves to true once the minimization action has completed
     */
    minimize(): Promise<any>;
    /**
     * Maximize the pop-out window, expanding it to its original size
     * Take no action for applications which are not of the pop-out variety or are already maximized
     * @return {Promise}    A Promise which resolves to true once the maximization action has completed
     */
    maximize(): Promise<any>;
    /**
     * @typedef {Object} setPosition~Options    The position options
     * @property {number} [left]                The left offset position in pixels
     * @property {number} [top]                 The top offset position in pixels
     * @property {number} [width]               The application width in pixels
     * @property {number} [height]              The application height in pixels
     * @property {number} [scale]               The application scale as a numeric factor where 1.0 is default
     **/
    /**
     * Set the application position and store it's new location.
     *
       * @param {setPosition~Options} [options]     The position options.
       * @param {string|number} [options.height]    The application height in pixels or auto
     *
       * @returns {setPosition~Options}             The updated position object for the application containing the new values
     */
    setPosition({ left, top, width, height, scale }?: {
        /**
         * The left offset position in pixels
         */
        left?: number;
        /**
         * The top offset position in pixels
         */
        top?: number;
        /**
         * The application width in pixels
         */
        width?: number;
        /**
         * The application height in pixels
         */
        height?: number;
        /**
         * The application scale as a numeric factor where 1.0 is default
         */
        scale?: number;
    }): {
        /**
         * The left offset position in pixels
         */
        left?: number;
        /**
         * The top offset position in pixels
         */
        top?: number;
        /**
         * The application width in pixels
         */
        width?: number;
        /**
         * The application height in pixels
         */
        height?: number;
        /**
         * The application scale as a numeric factor where 1.0 is default
         */
        scale?: number;
    };
    /**
     * Handle application minimization behavior - collapsing content and reducing the size of the header
     * @param {Event} ev
     * @private
     */
    private _onToggleMinimize;
    /**
     * Additional actions to take when the application window is resized
     * @param {Event} event
     * @private
     */
    private _onResize;
}
declare namespace Application {
    namespace RENDER_STATES {
        const CLOSING: number;
        const CLOSED: number;
        const NONE: number;
        const RENDERING: number;
        const RENDERED: number;
        const ERROR: number;
    }
}
/**
 * The FilePicker application renders contents of the server-side public directory
 * This app allows for navigating and uploading files to the public path
 * @type {Application}
 */
declare class FilePicker extends Application {
    /** @override */
    static get defaultOptions(): any;
    /**
     * Test a URL to see if it matches a well known s3 key pattern
     * @param {string} url          An input URL to test
     * @return {RegExpMatchArray}   A regular expression match
     */
    static matchS3URL(url: string): RegExpMatchArray;
    /**
     * Parse a s3 key to learn the bucket and the key prefix used for the request
     * @param {string} key    A fully qualified key name or prefix path
     * @return {{bucket: string, keyPrefix: string}}
     * @private
     */
    private static parseS3URL;
    /**
     * Return the upload URL to which the FilePicker should post uploaded files
     * @return {string}
     */
    static get uploadURL(): string;
    /**
     * Browse files for a certain directory location
     * @param {string} source     The source location in which to browse. See FilePicker#sources for details
     * @param {string} target     The target within the source location
     * @param {Object} options              Optional arguments
     * @param {string} options.bucket       A bucket within which to search if using the S3 source
     * @param {string[]} options.extensions An Array of file extensions to filter on
     * @param {boolean} options.wildcard    The requested dir represents a wildcard path
     *
     * @return {Promise}          A Promise which resolves to the directories and files contained in the location
     */
    static browse(source: string, target: string, options?: {
        bucket: string;
        extensions: string[];
        wildcard: boolean;
    }): Promise<any>;
    /**
     * Configure metadata settings regarding a certain file system path
     * @param {string} source     The source location in which to browse. See FilePicker#sources for details
     * @param {string} target     The target within the source location
     * @param {Object} options    Optional arguments which modify the request
     * @return {Promise<Object>}
     */
    static configurePath(source: string, target: string, options?: any): Promise<any>;
    /**
     * Create a subdirectory within a given source. The requested subdirectory path must not already exist.
     * @param {string} source     The source location in which to browse. See FilePicker#sources for details
     * @param {string} target     The target within the source location
     * @param {Object} options    Optional arguments which modify the request
     * @return {Promise<Object>}
     */
    static createDirectory(source: string, target: string, options?: any): Promise<any>;
    /**
     * General dispatcher method to submit file management commands to the server
     * @private
     */
    private static _manageFiles;
    /**
     * Dispatch a POST request to the server containing a directory path and a file to upload
     * @param {string} source   The data source to which the file should be uploaded
     * @param {string} path     The destination path
     * @param {File} file       The File object to upload
     * @param {Object} options  Additional file upload options passed as form data
     * @return {Promise<Object>}  The response object
     */
    static upload(source: string, path: string, file: File, options: any): Promise<any>;
    /**
     * Bind the file picker to a new target field.
     * Assumes the user will provide a <button> HTMLElement which has the data-target and data-type attributes
     * The data-target attribute should provide the name of the input field which should receive the selected file
     * The data-type attribute is a string in ["image", "audio"] which sets the file extensions which will be accepted
     *
     * @param button {HTMLElement}    The button element
     */
    static fromButton(button: HTMLElement, options: any): FilePicker;
    constructor(options?: {});
    /**
     * The full requested path given by the user
     * @type {string}
     */
    request: any;
    /**
     * The file sources which are available for browsing
     * @type {Object}
     */
    sources: any;
    /**
     * Track the active source tab which is being browsed
     * @type {string}
     */
    activeSource: any;
    /**
     * The latest set of results browsed from the server
     * @type {Object}
     */
    results: any;
    /**
     * The general file type which controls the set of extensions which will be accepted
     * @type {string}
     */
    type: string;
    /**
     * The target HTML element this file picker is bound to
     * @type {HTMLElement}
     */
    field: HTMLElement;
    /**
     * A button which controls the display of the picker UI
     * @type {HTMLElement}
     */
    button: HTMLElement;
    /**
     * The display mode of the FilePicker UI
     * @type {string}
     */
    displayMode: any;
    /**
     * The current set of file extensions which are being filtered upon
     * @type {string[]}
     */
    extensions: string[];
    _loaded: boolean;
    /**
     * Given a current file path, determine the directory it belongs to
     * @param {string} target   The currently requested target path
     * @return {string[]}       An array of the inferred source and target directory path
     */
    _inferCurrentDirectory(target: string): string[];
    /**
     * Get the valid file extensions for a given named file picker type
     * @param {string} type
     * @return {string[]}
     * @private
     */
    private _getExtensions;
    /**
     * Return the source object for the currently active source
     * @return {Object}
     */
    get source(): any;
    /**
     * Return the target directory for the currently active source
     * @return {string}
     */
    get target(): string;
    /**
     * Return a flag for whether the current user is able to upload file content
     * @return {boolean}
     */
    get canUpload(): boolean;
    /**
     * Browse to a specific location for this FilePicker instance
     * @param {string} target     The target within the currently active source location.
     * @param {Object} options    Browsing options
     */
    browse(target: string, options?: any): Promise<any>;
    result: any;
    /**
     * Handle a click event to change the display mode of the File Picker
     * @param {MouseEvent} event    The triggering click event
     * @private
     */
    private _onChangeDisplayMode;
    /**
     * Handle user submission of the address bar to request an explicit target
     * @param {KeyboardEvent} event     The originating keydown event
     * @private
     */
    private _onRequestTarget;
    /**
     * Handle requests from the IntersectionObserver to lazily load an image file
     * @private
     */
    private _onLazyLoadImages;
    /**
     * Handle file or folder selection within the file picker
     * @param {Event} event     The originating click event
     * @private
     */
    private _onPick;
    /**
     * Handle backwards navigation of the fol6der structure
     * @private
     */
    private _onClickDirectoryControl;
    /**
     * Present the user with a dialog to create a subdirectory within their currently browsed file storate location.
     * @private
     */
    private _createDirectoryDialog;
    /**
     * Handle changes to the bucket selector
     * @private
     */
    private _onChangeBucket;
    /**
     * Handle file picker form submission
     * @param ev {Event}
     * @private
     */
    private _onSubmit;
    /**
     * Handle file upload
     * @param ev
     * @private
     */
    private _onUpload;
}
declare namespace FilePicker {
    const LAST_BROWSED_DIRECTORY: string;
    const LAST_TILE_SIZE: any;
    const DISPLAY_MODES: {
        [x: string]: number;
    };
    const S3_BUCKETS: any[] | null;
}
/**
 * An abstract pattern for primary layers of the game canvas to implement
 * @type {PIXI.Container}
 * @abstract
 * @interface
 */
declare class CanvasLayer {
    /**
     * Track whether the canvas layer is currently active for interaction
     * @type {boolean}
     */
    _active: boolean;
    interactive: boolean;
    interactiveChildren: boolean;
    /**
     * The canonical name of the CanvasLayer
     * @return {string}
     */
    get name(): string;
    /**
     * Deconstruct data used in the current layer in preparation to re-draw the canvas
     */
    tearDown(): void;
    renderable: boolean;
    /**
     * Draw the canvas layer, rendering its internal components and returning a Promise
     * The Promise resolves to the drawn layer once its contents are successfully rendered.
     * @return {Promise<CanvasLayer>}
     */
    draw(): Promise<CanvasLayer>;
    width: any;
    height: any;
    hitArea: any;
    /**
     * Activate the CanvasLayer, deactivating other layers and marking this layer's children as interactive
     */
    activate(): void;
    /**
     * Deactivate the CanvasLayer, removing interactivity from its children
     */
    deactivate(): void;
}
/**
 * An abstract base class for displaying a heads-up-display interface bound to a Placeable Object on the canvas
 * @type {Application}
 * @abstract
 * @interface
 */
declare class BasePlaceableHUD extends Application {
    /** @override */
    static get defaultOptions(): any;
    constructor(...args: any[]);
    /**
     * Reference a PlaceableObject this HUD is currently bound to
     * @type {PlaceableObject}
     */
    object: PlaceableObject;
    /**
     * Convenience access for the canvas layer which this HUD modifies
     * @type {PlaceablesLayer}
     */
    get layer(): PlaceablesLayer;
    /**
     * Bind the HUD to a new PlaceableObject and display it
     * @param {PlaceableObject} object    A PlaceableObject instance to which the HUD should be bound
     */
    bind(object: PlaceableObject): void;
    /**
     * Clear the HUD by fading out it's active HTML and recording the new display state
     */
    clear(): void;
    /**
     * Toggle the visible state of all controlled objects in the Layer
     * @param {PointerEvent} event    The originating click event
     * @private
     */
    private _onToggleVisibility;
    /**
     * Toggle locked state of all controlled objects in the Layer
     * @param {PointerEvent} event    The originating click event
     * @private
     */
    private _onToggleLocked;
    /**
     * Handle sorting the z-order of the object
     * @param event
     * @param up
     * @return {Promise<void>}
     * @private
     */
    private _onSort;
}
/**
 * Edit a folder, configuring its name and appearance
 * @extends {FormApplication}
 */
declare class FolderConfig extends FormApplication {
    constructor(object?: {}, options?: {});
}
/**
 * A shared pattern for the sidebar directory which Actors, Items, and Scenes all use
 * @extends {SidebarTab}
 * @abstract
 * @interface
 */
declare class SidebarDirectory extends SidebarTab {
    /**
     * The named entity which this Sidebar Directory contains
     * @type {string}
     */
    static get entity(): string;
    /**
     * The Entity collection which this Sidebar Directory contains
     * @type {EntityCollection}
     */
    static get collection(): EntityCollection;
    /**
     * A reference to the Entity class which is displayed within this EntityCollection
     * @return {Entity}
     */
    static get cls(): Entity;
    /**
     * Given an entity type and a list of entities, set up the folder tree for that entity
     * @param {Folder[]} folders    The Array of Folder objects to organize
     * @param {Entity[]} entities   The Array of Entity objects to organize
     * @param {string} sortMode     How should entities or Folders be sorted? (a)lphabetic or (n)umeric
     * @return {Object}             A tree structure containing the folders and entities
     */
    static setupFolders(folders: Folder[], entities: Entity[], sortMode?: string): any;
    /**
     * Populate a single folder with child folders and content
     * This method is called recursively when building the folder tree
     * @private
     */
    private static _populate;
    constructor(options: any);
    /**
     * References to the set of Entities which are displayed in the Sidebar
     * @type {Entity[]}
     */
    entities: Entity[];
    /**
     * Reference the set of Folders which exist in this Sidebar
     * @type {Folder[]}
     */
    folders: Folder[];
    /**
     * Initialize the content of the directory by categorizing folders and entities into a hierarchical tree structure.
     */
    initialize(): void;
    tree: any;
    /**
     * Collapse all subfolders in this directory
     */
    collapseAll(): void;
    /**
     * Handle clicking on an Entity name in the Sidebar directory
     * @param {Event} event   The originating click event
     * @private
     */
    private _onClickEntityName;
    /**
     * Handle new creation request
     * @param {MouseEvent} event    The originating button click event
     * @private
     */
    private _onCreateEntity;
    /**
     * Create a new Folder in this SidebarDirectory
     * @param {MouseEvent} event    The originating button click event
     * @private
     */
    private _onCreateFolder;
    /**
     * Handle toggling the collapsed or expanded state of a folder within the directory tab
     * @param {MouseEvent} event    The originating click event
     * @private
     */
    private _toggleFolder;
    _dragType: any;
    /**
     * Define the behavior of the sidebar tab when it received a dropped data object
     * @param {Event} event   The original drop event
     * @param {Object} data   The data being dropped
     * @private
     */
    private _handleDropData;
    /**
     * Default folder context actions
     * @param html {jQuery}
     * @private
     */
    private _contextMenu;
    /**
     * Get the set of ContextMenu options which should be used for Folders in a SidebarDirectory
     * @return {object[]}   The Array of context options passed to the ContextMenu instance
     * @private
     */
    private _getFolderContextOptions;
    /**
     * Get the set of ContextMenu options which should be used for Entities in a SidebarDirectory
     * @return {object[]}   The Array of context options passed to the ContextMenu instance
     * @private
     */
    private _getEntryContextOptions;
}
/**
 * A Note is an implementation of PlaceableObject which represents an annotated location within the Scene.
 * Each Note links to a JournalEntry entity and represents it's location on the map.
 * @extends {PlaceableObject}
 *
 * @example
 * Note.create({
 *   entryId: journalEntry.id,
 *   x: 1000,
 *   y: 1000,
 *   icon: "icons/my-journal-icon.svg",
 *   iconSize: 40,
 *   iconTint: "#00FF000",
 *   text: "A custom label",
 *   fontSize: 48,
 *   textAnchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
 *   textColor: "#00FFFF"
 * });
 */
declare class Note extends PlaceableObject {
    constructor(...args: any[]);
    /**
     * The associated JournalEntry which is described by this note
     * @type {JournalEntry}
     */
    entry: JournalEntry;
    /**
     * Return the text label which describes the Note
     * Use a manually specified label with a fallback to the JournalEntry name
     * @type {string}
     */
    get text(): string;
    /**
     * The Map Note icon size
     * @type {number}
     */
    get size(): number;
    tooltip: any;
    /**
     * Draw the ControlIcon for the Map Note
     * @return {ControlIcon}
     * @private
     */
    private _drawControlIcon;
    /**
     * Draw the map note Tooltip as a Text object
     * @return {PIXI.Text}
     */
    _drawTooltip(): any;
    /**
     * Define a PIXI TextStyle object which is used for the tooltip displayed for this Note
     * @returns {PIXI.TextStyle}
     */
    _getTextStyle(): any;
    visible: boolean;
}
declare namespace jQuery {
    namespace fn {
        function shake(shakes: any, distance: any, duration: any): typeof jQuery.fn;
    }
}
/**
 * A controller class for managing drag and drop workflows within an Application instance.
 * The controller manages the following actions: dragstart, dragover, drop
 * @see {@link Application}
 *
 * @param {string} dragSelector     The CSS selector used to target draggable elements.
 * @param {string} dropSelector     The CSS selector used to target viable drop targets.
 * @param {Object<string,Function>} permissions    An object of permission test functions for each action
 * @param {Object<string,Function>} callbacks      An object of callback functions for each action
 *
 * @example
 * const dragDrop = new DragDrop({
 *   dragSelector: ".item",
 *   dropSelector: ".items",
 *   permissions: { dragstart: this._canDragStart.bind(this), drop: this._canDragDrop.bind(this) }
 *   callbacks: { dragstart: this._onDragStart.bind(this), drop: this._onDragDrop.bind(this) }
 * });
 * dragDrop.bind(html);
 */
declare class DragDrop {
    static createDragImage(img: any, width: any, height: any): HTMLElement;
    constructor({ dragSelector, dropSelector, permissions, callbacks }?: {
        dragSelector?: any;
        dropSelector?: any;
        permissions?: {};
        callbacks?: {};
    });
    /**
     * The HTML selector which identifies draggable elements
     * @type {string}
     */
    dragSelector: string;
    /**
     * The HTML selector which identifies drop targets
     * @type {string}
     */
    dropSelector: string;
    /**
     * A set of permission checking functions for each action of the Drag and Drop workflow
     * @type {Object}
     */
    permissions: any;
    /**
     * A set of callback functions for each action of the Drag and Drop workflow
     * @type {Object}
     */
    callbacks: any;
    /**
     * Bind the DragDrop controller to an HTML application
     * @param {HTMLElement} html    The HTML element to which the handler is bound
     */
    bind(html: HTMLElement): DragDrop;
    /**
     * Execute a callback function associated with a certain action in the workflow
     * @param {DragEvent} event   The drag event being handled
     * @param {string} action     The action being attempted
     */
    callback(event: DragEvent, action: string): any;
    /**
     * Test whether the current user has permission to perform a step of the workflow
     * @param {string} action     The action being attempted
     * @param {string} selector   The selector being targeted
     * @return {boolean}          Can the action be performed?
     */
    can(action: string, selector: string): boolean;
    /**
     * Handle the start of a drag workflow
     * @param {DragEvent} event   The drag event being handled
     * @private
     */
    private _handleDragStart;
    /**
     * Handle a dragged element over a droppable target
     * @param {DragEvent} event   The drag event being handled
     * @private
     */
    private _handleDragOver;
    /**
     * Handle a dragged element dropped on a droppable target
     * @param {DragEvent} event   The drag event being handled
     * @private
     */
    private _handleDrop;
}
/**
 * A controller class for managing tabbed navigation within an Application instance.
 * @see {@link Application}
 *
 * @param {string} navSelector      The CSS selector used to target the navigation element for these tabs
 * @param {string} contentSelector  The CSS selector used to target the content container for these tabs
 * @param {string} initial          The tab name of the initially active tab
 * @param {Function|null} callback  An optional callback function that executes when the active tab is changed
 *
 * @example
 * <!-- Example HTML -->
 * <nav class="tabs" data-group="primary-tabs">
 *   <a class="item" data-tab="tab1">Tab 1</li>
 *   <a class="item" data-tab="tab2">Tab 2</li>
 * </nav>
 *
 * <section class="content">
 *   <div class="tab" data-tab="tab1" data-group="primary-tabs">Content 1</div>
 *   <div class="tab" data-tab="tab2" data-group="primary-tabs">Content 2</div>
 * </section>
 *
 * @example
 * // JavaScript
 * const tabs = new Tabs({navSelector: ".tabs", contentSelector: ".content", initial: "tab1"});
 * tabs.bind(html);
 */
declare class Tabs {
    constructor({ navSelector, contentSelector, initial, callback }?: {
        navSelector: any;
        contentSelector: any;
        initial: any;
        callback: any;
    });
    /**
     * The value of the active tab
     * @type {string}
     */
    active: string;
    /**
     * A callback function to trigger when the tab is changed
     * @type {Function|null}
     */
    callback: Function | null;
    /**
     * The CSS selector used to target the tab navigation element
     * @type {string}
     */
    _navSelector: string;
    /**
     * A reference to the HTML navigation element the tab controller is bound to
     * @type {HTMLElement|null}
     */
    _nav: HTMLElement | null;
    /**
     * The CSS selector used to target the tab content element
     * @type {string}
     */
    _contentSelector: string;
    /**
     * A reference to the HTML container element of the tab content
     * @type {HTMLElement|null}
     */
    _content: HTMLElement | null;
    /**
     * Bind the Tabs controller to an HTML application
     * @param {HTMLElement} html
     */
    bind(html: HTMLElement): void;
    /**
     * Activate a new tab by name
     * @param {string} tabName
       * @param {Object} [options]
       * @param {boolean} [options.triggerCallback]
     */
    activate(tabName: string, { triggerCallback }?: {
        triggerCallback: boolean;
    }): void;
    /**
     * Handle click events on the tab navigation entries
     * @param {MouseEvent} event    A left click event
     * @private
     */
    private _onClickNav;
}
/**
 * A controller class for managing a text input widget that filters the contents of some other UI element
 * @see {@link Application}
 *
 * @param {string} inputSelector    The CSS selector used to target the text input element.
 * @param {string} contentSelector  The CSS selector used to target the content container for these tabs.
 * @param {string} initial          The initial value of the search query.
 * @param {Function} callback       A callback function which executes when the filter changes.
 * @param {number} delay            The number of milliseconds to wait for text input before processing.
 */
declare class SearchFilter {
    constructor({ inputSelector, contentSelector, initial, callback, delay }?: {
        inputSelector: any;
        contentSelector: any;
        initial?: string;
        callback: any;
        delay?: number;
    });
    /**
     * The value of the current query string
     * @type {string}
     */
    query: string;
    /**
     * A callback function to trigger when the tab is changed
     * @type {Function|null}
     */
    callback: Function | null;
    /**
     * The CSS selector used to target the tab navigation element
     * @type {string}
     */
    _inputSelector: string;
    /**
     * A reference to the HTML navigation element the tab controller is bound to
     * @type {HTMLElement|null}
     */
    _input: HTMLElement | null;
    /**
     * The CSS selector used to target the tab content element
     * @type {string}
     */
    _contentSelector: string;
    /**
     * A reference to the HTML container element of the tab content
     * @type {HTMLElement|null}
     */
    _content: HTMLElement | null;
    /**
     * A debounced function which applies the search filtering
     * @type {Function}
     */
    _filter: Function;
    /**
     * Bind the SearchFilter controller to an HTML application
     * @param {HTMLElement} html
     */
    bind(html: HTMLElement): void;
    /**
     * Handle key-up events within the filter input field
     * @param {KeyboardEvent} event   The key-up event
     * @private
     */
    private _onKeyUp;
}
/**
 * An abstract pattern followed by the different tabs of the sidebar
 * @type {Application}
 * @abstract
 * @interface
 */
declare class SidebarTab extends Application {
    /** @override */
    static get defaultOptions(): any;
    constructor(...args: any[]);
    /**
     * The base name of this sidebar tab
     * @type {string}
     */
    tabName: string;
    /**
     * A reference to the pop-out variant of this SidebarTab, if one exists
     * @type {SidebarTab}
     * @private
     */
    private _popout;
    /**
     * Denote whether or not this is the original version of the sidebar tab, or a pop-out variant
     * @type {SidebarTab}
     */
    _original: SidebarTab;
    /**
     * Activate this SidebarTab, switching focus to it
     */
    activate(): void;
    /**
     * Create a second instance of this SidebarTab class which represents a singleton popped-out container
     * @return {SidebarTab}   The popped out sidebar tab instance
     */
    createPopout(): SidebarTab;
    /**
     * Render the SidebarTab as a pop-out container
     */
    renderPopout(): void;
    /**
     * Handle lazy loading for sidebar images to only load them once they become observed
     * @param entries
     * @param observer
     */
    _onLazyLoadImage(entries: any, observer: any): void;
}
