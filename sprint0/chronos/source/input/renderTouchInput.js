/**
 * 
 * @param {import("./initialize").InputDatabase} db 
 */
export default function renderTouchInput(db){
    const canvas = document.getElementById("touch_input");
    const ctx = canvas.getContext("2d");

    // Resize and clear.
    const maxDirection = Math.max(canvas.clientWidth, canvas.clientHeight);

    db.touchDeadzoneRadius = maxDirection / 8;
    ctx.canvas.width  = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    if(leftTouchState){
        // Draw deadzone circle.
        const deadzoneCenterX = leftTouchState.startX;
        const deadzoneCenterY = leftTouchState.startY;

        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.lineWidth = 10;
        ctx.arc(deadzoneCenterX, deadzoneCenterY, db.touchDeadzoneRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw analog stick.
        let analogCenterX = leftTouchState.currentX;
        let analogCenterY = leftTouchState.currentY;

        let deadzoneToAnalogX = analogCenterX - deadzoneCenterX;
        let deadzoneToAnalogY = analogCenterY - deadzoneCenterY;
        let deadzoneToAnalogLength = Math.sqrt(deadzoneToAnalogX * deadzoneToAnalogX + deadzoneToAnalogY * deadzoneToAnalogY);
        if(deadzoneToAnalogLength > db.touchDeadzoneRadius){
            analogCenterX = deadzoneCenterX + (deadzoneToAnalogX / deadzoneToAnalogLength) * db.touchDeadzoneRadius;
            analogCenterY = deadzoneCenterY + (deadzoneToAnalogY / deadzoneToAnalogLength) * db.touchDeadzoneRadius;
        }

        ctx.beginPath();
        ctx.arc(analogCenterX, analogCenterY, db.touchDeadzoneRadius / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.strokeStyle = '#003300';
        ctx.stroke(); 
    }

    if(rightTouchState){
        // Draw deadzone circle.
        const deadzoneCenterX = rightTouchState.startX;
        const deadzoneCenterY = rightTouchState.startY;

        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.lineWidth = 10;
        ctx.arc(deadzoneCenterX, deadzoneCenterY, db.touchDeadzoneRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#330000';
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw analog stick.
        let analogCenterX = rightTouchState.currentX;
        let analogCenterY = rightTouchState.currentY;

        let deadzoneToAnalogX = analogCenterX - deadzoneCenterX;
        let deadzoneToAnalogY = analogCenterY - deadzoneCenterY;
        let deadzoneToAnalogLength = Math.sqrt(deadzoneToAnalogX * deadzoneToAnalogX + deadzoneToAnalogY * deadzoneToAnalogY);
        if(deadzoneToAnalogLength > db.touchDeadzoneRadius){
            analogCenterX = deadzoneCenterX + (deadzoneToAnalogX / deadzoneToAnalogLength) * db.touchDeadzoneRadius;
            analogCenterY = deadzoneCenterY + (deadzoneToAnalogY / deadzoneToAnalogLength) * db.touchDeadzoneRadius;
        }

        ctx.beginPath();
        ctx.arc(analogCenterX, analogCenterY, db.touchDeadzoneRadius / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = '#330000';
        ctx.stroke(); 
    }

    
}