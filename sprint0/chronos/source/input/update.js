import {ButtonInput, buttonInputsCount, ButtonState, GamepadButton, GamepadAxis} from "./initialize.js";

/**
 * @param {import("./initialize").InputDatabase} db 
 */
function transitionStates(db){
    // Transition pressed to held, and released to up.
    for(let inputIndex = 0; inputIndex < buttonInputsCount; ++inputIndex){
        if(db.buttonState[inputIndex] === ButtonState.PRESSED){
            db.buttonState[inputIndex] = ButtonState.DOWN;
        } else if(db.buttonState[inputIndex] === ButtonState.RELEASED){
            db.buttonState[inputIndex] = ButtonState.UP;
        }
    }
}
/**
 * @param {import("./initialize").InputDatabase} db 
 */
function processKeyboardInput(db){
    const eventsToProcessCount = db.keyboardEvents.length;
    for(let eventIndex = 0; eventIndex < eventsToProcessCount; ++eventIndex){
        const event = db.keyboardEvents[eventIndex];
        db.buttonState[event.input] = event.state;
    }
    db.keyboardEvents.splice(0, eventsToProcessCount);
}
/**
 * @param {import("./initialize").InputDatabase} db 
 */
function processDPADInput(db){
    db.gamepad = navigator.getGamepads()[0];

    if(db.gamepad){
        /* Debugging gamepad button indicies */
        /*
        for(let i = 0; i < db.gamepad.buttons.length; ++i){
            if(db.gamepad.buttons[i].pressed){
                console.log(i);
            }
        }
        */


        // DPAD movement.
        {
            if(db.gamepad.buttons[GamepadButton.DPAD_LEFT].pressed){
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_LEFT] === ButtonState.UP){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_LEFT] = ButtonState.PRESSED;
                }
            } else{
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_LEFT] === ButtonState.DOWN){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_LEFT] = ButtonState.RELEASED;
                }
            }
    
            if(db.gamepad.buttons[GamepadButton.DPAD_RIGHT].pressed){
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_RIGHT] === ButtonState.UP){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_RIGHT] = ButtonState.PRESSED;
                }
            } else{
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_RIGHT] === ButtonState.DOWN){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_RIGHT] = ButtonState.RELEASED;
                }
            }
    
            if(db.gamepad.buttons[GamepadButton.DPAD_UP].pressed){
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_UP] === ButtonState.UP){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_UP] = ButtonState.PRESSED;
                }
            } else{
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_UP] === ButtonState.DOWN){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_UP] = ButtonState.RELEASED;
                }
            }
    
            if(db.gamepad.buttons[GamepadButton.DPAD_DOWN].pressed){
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_DOWN] === ButtonState.UP){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_DOWN] = ButtonState.PRESSED;
                }
            } else{
                if(db.buttonState[ButtonInput.GAMEPAD_DPAD_DOWN] === ButtonState.DOWN){
                    db.buttonState[ButtonInput.GAMEPAD_DPAD_DOWN] = ButtonState.RELEASED;
                }
            }
        }

        // Triggers.
        {
            if(db.gamepad.buttons[GamepadButton.RIGHT_TRIGGER].pressed){
                if(db.buttonState[ButtonInput.GAMEPAD_RIGHT_TRIGGER] === ButtonState.UP){
                    db.buttonState[ButtonInput.GAMEPAD_RIGHT_TRIGGER] = ButtonState.PRESSED;
                }
            } else{
                if(db.buttonState[ButtonInput.GAMEPAD_RIGHT_TRIGGER] === ButtonState.DOWN){
                    db.buttonState[ButtonInput.GAMEPAD_RIGHT_TRIGGER] = ButtonState.RELEASED;
                }
            }
        }
    }
}
/**
 * Converts touch input into touch analog stick.
 * @param {import("./initialize").InputDatabase} db 
 */
function processTouchInput(db){
    // Reset analog stick.
    db.touchMovementAnalogStick = {x: 0, y: 0};
    db.touchCameraAnalogStick = {x: 0, y: 0};
    
    if(!db.touchStates[0]) return;

    const canvas = document.getElementById("touch_input");
    const leftBoundary = canvas.width / 2;

    const touchStateIDs = Object.keys(db.touchStates);
    let leftTouchState = null;
    let rightTouchState = null;
    for(let touchStateIndex = 0; touchStateIndex < touchStateIDs.length; touchStateIndex++){
        /** @type {import("./initialize").TouchState} */
        const touchState = db.touchStates[touchStateIDs[touchStateIndex]];

        if(leftTouchState === null && touchState.startX < leftBoundary){
            leftTouchState = touchState;
        } else if(rightTouchState === null && touchState.startX >= leftBoundary){
            rightTouchState = touchState;
        }
    }

    // Movement.
    if(leftTouchState){
        const deadzoneCenterX = leftTouchState.startX;
        const deadzoneCenterY = leftTouchState.startY;
        let analogCenterX = leftTouchState.currentX;
        let analogCenterY = leftTouchState.currentY;
        let deadzoneToAnalogX = analogCenterX - deadzoneCenterX;
        let deadzoneToAnalogY = analogCenterY - deadzoneCenterY;
        let deadzoneToAnalogLength = Math.sqrt(deadzoneToAnalogX * deadzoneToAnalogX + deadzoneToAnalogY * deadzoneToAnalogY);

        // Normalize between -1.0 -> 1.0.
        if(deadzoneToAnalogLength > db.touchDeadzoneRadius){ // Outside deadzone, normalize to length.
            deadzoneToAnalogX = deadzoneToAnalogX / deadzoneToAnalogLength;
            deadzoneToAnalogY = deadzoneToAnalogY / deadzoneToAnalogLength;
        } else{ // Inside deadzone, normalize to radius.
            deadzoneToAnalogX = deadzoneToAnalogX / db.touchDeadzoneRadius;
            deadzoneToAnalogY = deadzoneToAnalogY / db.touchDeadzoneRadius;
        }

        db.touchMovementAnalogStick.x = deadzoneToAnalogX;
        db.touchMovementAnalogStick.y = -deadzoneToAnalogY; // Invert as positive Y is down on screen.
    }

    // Camera.
    if(rightTouchState){
        const deadzoneCenterX = rightTouchState.startX;
        const deadzoneCenterY = rightTouchState.startY;
        let analogCenterX = rightTouchState.currentX;
        let analogCenterY = rightTouchState.currentY;
        let deadzoneToAnalogX = analogCenterX - deadzoneCenterX;
        let deadzoneToAnalogY = analogCenterY - deadzoneCenterY;
        let deadzoneToAnalogLength = Math.sqrt(deadzoneToAnalogX * deadzoneToAnalogX + deadzoneToAnalogY * deadzoneToAnalogY);

        // Normalize between -1.0 -> 1.0.
        if(deadzoneToAnalogLength > db.touchDeadzoneRadius){ // Outside deadzone, normalize to length.
            deadzoneToAnalogX = deadzoneToAnalogX / deadzoneToAnalogLength;
            deadzoneToAnalogY = deadzoneToAnalogY / deadzoneToAnalogLength;
        } else{ // Inside deadzone, normalize to radius.
            deadzoneToAnalogX = deadzoneToAnalogX / db.touchDeadzoneRadius;
            deadzoneToAnalogY = deadzoneToAnalogY / db.touchDeadzoneRadius;
        }

        db.touchCameraAnalogStick.x = deadzoneToAnalogX;
        db.touchCameraAnalogStick.y = -deadzoneToAnalogY; // Invert as positive Y is down on screen.
    }

    
}

/**
 * @param {import("./initialize").InputDatabase} db 
 */
function translateInputsToRightAxis(db){
    // Reset.
    db.rightAxis = 0;

    // LEFT.
    const keyboardLeftPressed = db.buttonState[ButtonInput.KEYBOARD_A] === ButtonState.PRESSED || db.buttonState[ButtonInput.KEYBOARD_A] === ButtonState.DOWN;
    const gamepadLeftPressed = db.buttonState[ButtonInput.GAMEPAD_DPAD_LEFT] === ButtonState.PRESSED || db.buttonState[ButtonInput.GAMEPAD_DPAD_LEFT] === ButtonState.DOWN;
    const gamepadAnalogStickHeldLeft = db.gamepad && db.gamepad.axes[GamepadAxis.LEFT_STICK_X] < -0.1;
    const touchpadMovementAnalogStickHeldLeft = db.touchMovementAnalogStick.x < -0.1;
    if(keyboardLeftPressed || gamepadLeftPressed || gamepadAnalogStickHeldLeft || touchpadMovementAnalogStickHeldLeft)
    {
        if(gamepadAnalogStickHeldLeft){
            db.rightAxis += db.gamepad.axes[GamepadAxis.LEFT_STICK_X];
        }
        if(touchpadMovementAnalogStickHeldLeft){
            db.rightAxis += db.touchMovementAnalogStick.x;
        }
        if(keyboardLeftPressed || gamepadLeftPressed){
            db.rightAxis += -1.0;
        }
    }

    // RIGHT.
    const keyboardRightPressed = db.buttonState[ButtonInput.KEYBOARD_D] === ButtonState.PRESSED || db.buttonState[ButtonInput.KEYBOARD_D] === ButtonState.DOWN;
    const gamepadRightPressed = db.buttonState[ButtonInput.GAMEPAD_DPAD_RIGHT] === ButtonState.PRESSED || db.buttonState[ButtonInput.GAMEPAD_DPAD_RIGHT] === ButtonState.DOWN;
    const gamepadAnalogStickHeldRight = db.gamepad && db.gamepad.axes[GamepadAxis.LEFT_STICK_X] > 0.1;
    const touchpadMovementAnalogStickHeldRight = db.touchMovementAnalogStick.x > 0.1;
    if(keyboardRightPressed || gamepadRightPressed || gamepadAnalogStickHeldRight || touchpadMovementAnalogStickHeldRight){
        if(gamepadAnalogStickHeldRight){
            db.rightAxis += db.gamepad.axes[GamepadAxis.LEFT_STICK_X];
        }
        if(touchpadMovementAnalogStickHeldRight){
            db.rightAxis += db.touchMovementAnalogStick.x;
        }
        if(keyboardRightPressed || gamepadRightPressed){
            db.rightAxis += 1.0;
        }
    }
}
/**
 * @param {import("./initialize").InputDatabase} db 
 */
function translateInputsToForwardAxis(db){
    // Reset.
    db.forwardAxis = 0;

    // UP.
    const keyboardUpPressed = db.buttonState[ButtonInput.KEYBOARD_W] === ButtonState.PRESSED || db.buttonState[ButtonInput.KEYBOARD_W] === ButtonState.DOWN;
    const gamepadUpPressed = db.buttonState[ButtonInput.GAMEPAD_DPAD_UP] === ButtonState.PRESSED || db.buttonState[ButtonInput.GAMEPAD_DPAD_UP] === ButtonState.DOWN;
    const gamepadAnalogStickHeldUp = db.gamepad && db.gamepad.axes[GamepadAxis.LEFT_STICK_Y] < -0.1;
    const touchpadMovementAnalogStickHeldUp = db.touchMovementAnalogStick.y > 0.1;
    if(keyboardUpPressed || gamepadUpPressed || gamepadAnalogStickHeldUp || touchpadMovementAnalogStickHeldUp)
    {
        if(gamepadAnalogStickHeldUp){
            db.forwardAxis += db.gamepad.axes[GamepadAxis.LEFT_STICK_Y] * -1;
        }
        if(touchpadMovementAnalogStickHeldUp){
            db.forwardAxis += db.touchMovementAnalogStick.y;
        }
        if(keyboardUpPressed || gamepadUpPressed){
            db.forwardAxis += 1.0;
        }
    }

    // DOWN.
    const keyboardDownPressed = db.buttonState[ButtonInput.KEYBOARD_S] === ButtonState.PRESSED || db.buttonState[ButtonInput.KEYBOARD_S] === ButtonState.DOWN;
    const gamepadDownPressed = db.buttonState[ButtonInput.GAMEPAD_DPAD_DOWN] === ButtonState.PRESSED || db.buttonState[ButtonInput.GAMEPAD_DPAD_DOWN] === ButtonState.DOWN;
    const gamepadAnalogStickHeldDown = db.gamepad && db.gamepad.axes[GamepadAxis.LEFT_STICK_Y] > 0.1;
    const touchpadMovementAnalogStickHeldDown = db.touchMovementAnalogStick.y < -0.1;
    if(keyboardDownPressed || gamepadDownPressed || gamepadAnalogStickHeldDown || touchpadMovementAnalogStickHeldDown){
        if(gamepadAnalogStickHeldDown){
            db.forwardAxis += db.gamepad.axes[GamepadAxis.LEFT_STICK_Y] * -1;
        }
        if(touchpadMovementAnalogStickHeldDown){
            db.forwardAxis += db.touchMovementAnalogStick.y;
        }
        if(keyboardDownPressed || gamepadDownPressed){
            db.forwardAxis += -1.0;
        }
    }
}
/**
 * @param {import("./initialize").InputDatabase} db 
 */
function translateInputsToYawAxis(db){
    db.yawAxis = 0;

    const gamepadAnalogStickHeldRight = db.gamepad && db.gamepad.axes[GamepadAxis.RIGHT_STICK_X] > 0.1;
    const mouseMovedRight = db.mouseMovementX > 0;
    const touchpadCameraAnalogStickHeldRight = db.touchCameraAnalogStick.x > 0.1;
    if(gamepadAnalogStickHeldRight || mouseMovedRight || touchpadCameraAnalogStickHeldRight){
        if(gamepadAnalogStickHeldRight){
            db.yawAxis += db.gamepad.axes[GamepadAxis.RIGHT_STICK_X] * db.gamepadCameraYawSensitivity;
        }
        if(touchpadCameraAnalogStickHeldRight){
            db.yawAxis += db.touchCameraAnalogStick.x * db.touchpadCameraYawSensitivity;
        }
        if(mouseMovedRight){
            db.yawAxis += db.mouseMovementX * db.mouseCameraYawSensitivity;
        }
    }

    const gamepadAnalogStickHeldLeft = db.gamepad && db.gamepad.axes[GamepadAxis.RIGHT_STICK_X] < -0.1;
    const mouseMovedLeft = db.mouseMovementX < 0;
    const touchpadCameraAnalogStickHeldLeft = db.touchCameraAnalogStick.x < -0.1;
    if(gamepadAnalogStickHeldLeft || mouseMovedLeft || touchpadCameraAnalogStickHeldLeft){
        if(gamepadAnalogStickHeldLeft){
            db.yawAxis += db.gamepad.axes[GamepadAxis.RIGHT_STICK_X] * db.gamepadCameraYawSensitivity;
        }
        if(touchpadCameraAnalogStickHeldLeft){
            db.yawAxis += db.touchCameraAnalogStick.x * db.touchpadCameraYawSensitivity;
        }
        if(mouseMovedLeft){
            db.yawAxis += db.mouseMovementX * db.mouseCameraYawSensitivity;
        }
    }

    db.mouseMovementX = 0; // Consumed.
}
/**
 * @param {import("./initialize").InputDatabase} db 
 */
function translateInputsToPitchAxis(db){
    db.pitchAxis = 0;

    const gamepadAnalogStickHeldUp = db.gamepad && db.gamepad.axes[GamepadAxis.RIGHT_STICK_Y] > 0.1;
    const mouseMovedUp = db.mouseMovementY > 0;
    const touchpadCameraAnalogStickHeldUp = db.touchCameraAnalogStick.y > 0.1;
    if(gamepadAnalogStickHeldUp || mouseMovedUp || touchpadCameraAnalogStickHeldUp){
        if(gamepadAnalogStickHeldUp){
            db.pitchAxis += db.gamepad.axes[GamepadAxis.RIGHT_STICK_Y] * -db.gamepadCameraPitchSensitivity;
        }
        if(touchpadCameraAnalogStickHeldUp){
            db.pitchAxis += db.touchCameraAnalogStick.y * db.touchpadCameraPitchSensitivity;
        }
        if(mouseMovedUp){
            db.pitchAxis += db.mouseMovementY * -db.mouseCameraPitchSensitivity;
        }
    }

    const gamepadAnalogStickHeldDown = db.gamepad && db.gamepad.axes[GamepadAxis.RIGHT_STICK_Y] < -0.1;
    const mouseMovedDown = db.mouseMovementY < 0;
    const touchpadCameraAnalogStickHeldDown = db.touchCameraAnalogStick.y < -0.1;
    if(gamepadAnalogStickHeldDown || mouseMovedDown || touchpadCameraAnalogStickHeldDown){
        if(gamepadAnalogStickHeldDown){
            db.pitchAxis += db.gamepad.axes[GamepadAxis.RIGHT_STICK_Y] * -db.gamepadCameraPitchSensitivity;
        }
        if(touchpadCameraAnalogStickHeldDown){
            db.pitchAxis += db.touchCameraAnalogStick.y * db.touchpadCameraPitchSensitivity;
        }
        if(mouseMovedDown){
            db.pitchAxis += db.mouseMovementY * -db.mouseCameraPitchSensitivity;
        }
    }

    db.mouseMovementY = 0; // Consumed. <-- change to event?
}


/**
 * @param {import("./initialize").InputDatabase} db 
 */
export default function update(db){
    //transitionStates(db);
    // bug where it was occasionally infinite running

    // Process inputs.
    processKeyboardInput(db);
    processDPADInput(db);
    processTouchInput(db);

    // Translate inputs into axis.
    translateInputsToRightAxis(db);
    translateInputsToForwardAxis(db);
    translateInputsToYawAxis(db);
    translateInputsToPitchAxis(db);
}
