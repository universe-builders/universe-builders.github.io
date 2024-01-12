import render from "../../eros/source/renderer/render.js";
import clearRenderer from "../../eros/source/renderer/clear.js";

import initializeInput from "./input/initialize.js";
import updateInput from "./input/update.js";
import renderTouchInput from "./input/renderTouchInput.js";

/**
 * @param {import("./index").ChronusDatabase} db 
 */
export default function update(db){
	const frameStart = performance.now();
	const timeToSimulate = (frameStart - db.previousFrameStartMS)/1000; // Simulate all time taken since start of previous frame.
	db.previousFrameStartMS = frameStart;
	
	db.module.step(timeToSimulate, db.input.forwardAxis, db.input.rightAxis, db.input.yawAxis, db.input.pitchAxis);
	var dv = new DataView(db.memory.buffer, 0);
	clearRenderer(db.renderer);

    // Set up some random floats in memory.
	for(let i = 0; i < 10000; i++) {
		db.memoryDataView.setFloat32( db.heapBase + (i * 4), Math.random(), true );
	}

	// RENDER PLAYER
	{
		const playerPositionAddress = db.module.get_player_position();
		const playerOrientationAddress = db.module.get_player_orientation();
		const playerPosition = new Float32Array(dv.buffer, playerPositionAddress, 3);
		const playerDirection = new Float32Array(dv.buffer, playerOrientationAddress, 3);

        /* WASM SIDE
        const voxelsAddress = db.module.get_voxels();
        const voxelPositionsAddress = dv.getUint32(voxelsAddress + 4, true);
        const voxelColorsAddress = dv.getUint32(voxelsAddress + 8, true);

        const voxelCount = dv.getInt32(voxelsAddress, true);
        const voxelPositions = new Float32Array(dv.buffer, voxelPositionsAddress, voxelCount * 3);
        const voxelColors = new Float32Array(dv.buffer, voxelColorsAddress, voxelCount * 3);
        */

        /*
		const positions = new Float32Array([
			0, 0, 0
		]);
		const red = [1, 0, 0];
		const colors = new Float32Array([
			...red,
		]);
        */

		render(db.renderer, playerPosition, playerDirection, db.roomModel.voxelCount, db.roomModel.voxelPositions, db.roomModel.voxelPalleteIndex, db.roomModel.palette);
	}
	/*
	// RENDER VOXELS
	{
		const voxelCount = dv.getUint32(db.voxelsAddress, true);
		const positionComponentsAddress = dv.getUint32(db.voxelsAddress + 4, true);
		const colorComponentsAddress = dv.getUint32(db.voxelsAddress + 8, true);

		const positions = new Float32Array(dv.buffer, positionComponentsAddress, voxelCount * 3);
		const colors = new Float32Array(new Float32Array(dv.buffer, colorComponentsAddress, voxelCount * 3));
		render(db.renderer, positions.length / 3, positions, colors);
	}
	*/
	
	updateInput(db.input);
	renderTouchInput(db.input);

	requestAnimationFrame(()=>{update(db)});



	/*
	const playerX = dv.getFloat32(playerPositionComponentAddress, true);
	const playerY = dv.getFloat32(playerPositionComponentAddress + 4, true);

	const positions = new Float32Array([
		playerX, playerY, 0,           // Cube 0
	]);
	*/

	/*
	const screenX = dv.getFloat32(playerPositionComponentAddress, true);
	const screenY = dv.getFloat32(playerPositionComponentAddress + 4, true);

	const screenToGLW = 2 / canvas.clientWidth;
	const screenToGLH = 2 / canvas.clientHeight;

	const glX = (screenX - (canvas.clientWidth/2)) * screenToGLW;
	const glY = (screenY - (canvas.clientHeight/2)) * screenToGLH * -1;

	const positions = new Float32Array([
		glX, glY, 0,           // Cube 0
	]);
	*/

	
}