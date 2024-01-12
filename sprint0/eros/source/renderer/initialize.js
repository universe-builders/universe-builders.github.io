import { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4, glMatrix } from "/chronos/third_party/gl-matrix/index.js"
import initializeVoxelProgram from "./programs/voxel/initialize.js";
import initializeAxisProgram from "./programs/axis/initialize.js";

/**
 * @typedef {Object} RendererDatabase
 * @property {WebGL2RenderingContext} gl - the WebGL2 rendering context.
 * @property {number} startTime - the time when the renderer was initialized.
 * @property {import("./programs/voxel/initialize.js").VoxelProgram} voxelProgram - the voxel program.
 * @property {AxisProgram} axisProgram - the axis program.
 * @property {mat4} projection - the projection matrix.
 */

/**
 * Initializes the provided db with the renderer database.
 * @param {RendererDatabase} db - the renderer database to initialize.
 * @param {HTMLCanvasElement} canvasElement - the canvas element to render to.
 */
export default async function initializeRenderer(db, canvasElement) {
    // Get A WebGL context
	db.gl = canvasElement.getContext("webgl2");
	if (!db.gl) {
        console.error("WebGL2 is not supported by your browser.")
	    return;
	}

	// Initialize programs.
	db.voxelProgram = {};
	db.axisProgram = {};
	await initializeVoxelProgram(db.voxelProgram, db.gl);
	await initializeAxisProgram(db.axisProgram, db.gl);
	
	// Enable settings.
	db.gl.enable(db.gl.DEPTH_TEST);
	db.gl.enable(db.gl.CULL_FACE);
	db.gl.cullFace(db.gl.BACK);
	db.gl.frontFace(db.gl.CCW);

    // Set time.
    db.startTime = Date.now();

	db.mouseMovementX = 0;
	db.mouseMovementY = 0;

	document.onclick = () => {
		canvasElement.requestPointerLock();
	};
}