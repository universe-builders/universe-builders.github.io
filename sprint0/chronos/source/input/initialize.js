/**
 * The database for the input module.
 * @typedef {Object} InputDatabase
 * @property {number} mouseX - the x coordinate of the mouse.
 * @property {number} mouseY - the y coordinate of the mouse.
 * @property {number} mouseMovementX - the x coordinate of the mouse.
 * @property {number} mouseMovementY - the y coordinate of the mouse.
 * @property {number} forwardAxis - the forward axis, from -1.0 -> 1.0 where -1.0 is backward.
 * @property {number} rightAxis - the right axis, from -1.0 -> 1.0 where -1.0 is left.
 * @property {number} yawAxis - the yaw axis, from -1.0 -> 1.0 where -1.0 is right.
 * @property {number} pitchAxis - the pitch axis, from -1.0 -> 1.0 where -1.0 is up.
 * @property {ButtonInput[]} buttonState - the state of the input, uses INPUTS enum as indices.
 * @property {Gamepad} gamepad - the gamepad.
 * @property {ButtonEvent[]} keyboardEvents - events to be processed by update.
 * @property {number} touchDeadzoneRadius - the radius of the deadzone for touch input.
 * @property {TouchAnalogStick} touchMovementAnalogStick
 * @property {TouchAnalogStick} touchCameraAnalogStick
 * @property {Object.<number, TouchState>} touchStates - the touch states, indexed by touch identifier.
 * @property {number} mouseCameraYawSensitivity - the sensitivity of the mouse on the x axis.
 * @property {number} mouseCameraPitchSensitivity - the sensitivity of the mouse on the y axis.
 * @property {number} gamepadCameraYawSensitivity - the sensitivity of the gamepad on the x axis.
 * @property {number} gamepadCameraPitchSensitivity - the sensitivity of the gamepad on the y axis.
 * @property {number} touchpadCameraYawSensitivity - the sensitivity of the gamepad on the y axis.
 * @property {number} touchpadCameraPitchSensitivity - the sensitivity of the gamepad on the y axis.
 */

/**
 * Touch Analog Stick
 * @type {TouchAnalogStick}
 * @property {number} x - the x coordinate of the analog stick, from -1.0 -> 1.0 where -1.0 is left.
 * @property {number} y - the y coordinate of the analog stick, from -1.0 -> 1.0 where -1.0 is down.
 */


/**
 * Enum for input indicies.
 * @readonly
 * @enum {number}
 */
const ButtonInput = {
    KEYBOARD_W: 0,
    KEYBOARD_A: 1,
    KEYBOARD_S: 2,
    KEYBOARD_D: 3,
    MOUSE_LEFT: 4,

    GAMEPAD_DPAD_UP: 5,
    GAMEPAD_DPAD_DOWN: 6,
    GAMEPAD_DPAD_LEFT: 7,
    GAMEPAD_DPAD_RIGHT: 8,
    GAMEPAD_RIGHT_TRIGGER: 9,
}
const buttonInputsCount = ButtonInput.GAMEPAD_RIGHT_TRIGGER + 1;
export {buttonInputsCount};
export {ButtonInput};

/**
 * Enum for input states.
 * @readonly
 * @enum {number}
 */
const ButtonState = {
    UP: 0,
    DOWN: 1,
    PRESSED: 2,
    RELEASED: 3
}
export {ButtonState};

/**
 * @typedef {Object} TouchState
 * @property {number} startX
 * @property {number} startY
 * @property {number} currentX
 * @property {number} currentY
 */

/**
 * Type for Input events.
 * @typedef {Object} ButtonEvent
 * @property {ButtonInput} input - the input this event relates to.
 * @property {ButtonState} state - the state of the input.
 */

/**
 * Enum for mapping gamepad button inidices.
 * @readonly
 * @enum {number}
 */
const GamepadButton = {
    RIGHT_TRIGGER: 7,    
    
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15,
    DPAD_UP: 12,
    DPAD_DOWN: 13,
}
export {GamepadButton};

/**
 * Enum for mapping gamepad axes inidices.
 * @readonly
 * @enum {number}
 */
const GamepadAxis = {
    LEFT_STICK_X: 0,
    LEFT_STICK_Y: 1,
    RIGHT_STICK_X: 2,
    RIGHT_STICK_Y: 3,
}
export {GamepadAxis};

/**
 * 
 * @typedef {Object} MovementAnalogStick
 * @property {number} x - the x coordinate of the analog stick.
 * @property {number} y - the y coordinate of the analog stick.
 */

/**
 * Initializes the input module, and sets up events for handling inputs.
 * @param {InputDatabase} db - the database to initialize.
 */
export default function initialize(db){
    // Initialize.
    db.mouseX = null;
    db.mouseY = null;
    db.forwardAxis = 0;
    db.rightAxis = 0; 
    db.yawAxis = 0;
    db.pitchAxis = 0;
    db.mouseMovementX = 0;
    db.mouseMovementY = 0;
    db.gamepad = null;
    db.keyboardEvents = [];
    db.touchDeadzoneRadius = 200;
    db.touchMovementAnalogStick = {x: 0, y: 0};
    db.touchCameraAnalogStick = {x: 0, y: 0};
    db.touchStates = {};

    db.mouseCameraYawSensitivity = 0.8;
    db.mouseCameraPitchSensitivity = 0.4;
    db.gamepadCameraYawSensitivity = 4.0;
    db.gamepadCameraPitchSensitivity = 1.0;
    db.touchpadCameraYawSensitivity = 20.0;
    db.touchpadCameraPitchSensitivity = 4.0;

    db.buttonState = Array(buttonInputsCount).fill(ButtonState.UP);

    // Mouse position.
    document.onmousemove = (event)=>{
		db.mouseX = event.clientX;
		db.mouseY = event.clientY;
        db.mouseMovementX = event.movementX;
        db.mouseMovementY = event.movementY;
	}
    document.onmousedown = (event)=>{
        db.attack = ButtonState.PRESSED;
    }
    document.onmouseup = (event)=>{
        db.attack = ButtonState.RELEASED;
    }

    // Touch Input.
    addEventListener("touchstart", 
        (event) => {
            /** @type {TouchState} */
            const touchState = {
                startX: event.changedTouches[0].clientX,
                startY: event.changedTouches[0].clientY,
                currentX: event.changedTouches[0].clientX,
                currentY: event.changedTouches[0].clientY,
            }
            db.touchStates[event.changedTouches[0].identifier] = touchState;
        }
    );
    addEventListener("touchmove", (event) => {
        for(let touchIndex = 0; touchIndex < event.changedTouches.length; touchIndex++){
            db.touchStates[event.changedTouches[touchIndex].identifier].currentX = event.changedTouches[touchIndex].clientX;
            db.touchStates[event.changedTouches[touchIndex].identifier].currentY = event.changedTouches[touchIndex].clientY;
        }
    });
    addEventListener("touchend", (event)=>{
        delete db.touchStates[event.changedTouches[0].identifier];
    })
    
    /*
        Unknown timing for these events, so convert to Input events which are processed on update.
    */
    window.addEventListener('keydown', function(event) {
        switch(event.key){
            case "W":
            case "w":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_W, state: ButtonState.DOWN});
                break;
            case "S":
            case "s":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_S, state: ButtonState.DOWN});
                break;
            case "A":
            case "a":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_A, state: ButtonState.DOWN});
                break;
            case "D":
            case "d":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_D, state: ButtonState.DOWN});
                break;
        }
    });
    window.addEventListener('keyup', function(event) {
        switch(event.key){
            case "W":
            case "w":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_W, state: ButtonState.UP});
                break;
            case "S":
            case "s":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_S, state: ButtonState.UP});
                break;
            case "A":
            case "a":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_A, state: ButtonState.UP});
                break;
            case "D":
            case "d":
                db.keyboardEvents.push({input: ButtonInput.KEYBOARD_D, state: ButtonState.UP});
                break;
        }
    });

}

