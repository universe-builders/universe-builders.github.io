import { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4, glMatrix } from "../../../../../chronos/third_party/gl-matrix/index.js"
 
/**
 * @typedef {Object} AxisProgram
 * @property {WebGLProgram} program - the WebGL program for rendering axis lines.
 * @property {WebGLBuffer} vertexBuffer - the WebGL vertex buffer for axis lines.
 * @property {WebGLBuffer} colorBuffer - the WebGL color buffer for axis lines.
 * @property {WebGLVertexArrayObject} VAO - the WebGL vertex array object.
 * @property {WebGLInt} colorAttributeLocation - the WebGL color attribute location.
 * @property {WebGLInt} positionAttributeLocation - the WebGL position attribute location.
 * @property {mat4} modelToWorld - the world matrix.
 */

/**
 * Initializes the provided db with the axis program, the program which renders
 * the coordinate axis lines.
 * @param {AxisProgram} db - the axis program database.
 * @param {WebGL2RenderingContext} gl - the WebGL2 rendering context.
 */
export default async function initializeAxisProgram(db, gl) {
	// Load shaders.
	const vertexShaderSource = await (await fetch("/eros/source/shaders/axis.vert") ).text();
	const fragmentShaderSource = await (await fetch("/eros/source/shaders/axis.frag") ).text();

	// Create program.
	db.program = webglUtils.createProgramFromSources(gl, [vertexShaderSource, fragmentShaderSource]);
	gl.useProgram(db.program);

	// Create VAO.
	db.VAO = gl.createVertexArray();
	gl.bindVertexArray(db.VAO);

	// Populate vertex buffer.
	{
		db.vertexBuffer = gl.createBuffer();
		const vertexAttributeLocation = gl.getAttribLocation(db.program, "model_vertex");
		gl.enableVertexAttribArray(vertexAttributeLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, db.vertexBuffer);
		const origin = [0,0,0];
		const lineLength = 100;
		const xPos = [lineLength,0,0];
		const yPos = [0,lineLength,0];
		const zPos = [0,0,lineLength];
		const xNeg = [-lineLength,0,0];
		const yNeg = [0,-lineLength,0];
		const zNeg = [0,0,-lineLength];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			...origin, ...xPos,
			...origin, ...xNeg,
			...origin, ...yPos,
			...origin, ...yNeg,
			...origin, ...zPos,
			...origin, ...zNeg
		]), gl.STATIC_DRAW);
	
		// Tell the attribute how to get data out of vertexBuffer (ARRAY_BUFFER)
		var size = 3;          // 3 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(vertexAttributeLocation, size, type, normalize, stride, offset);
	}

	// Populate color buffer.
	{
		const red = [1,0,0]; const green = [0,1,0]; const blue = [0,0,1];
		const dRed = [0.5,0,0]; const dGreen = [0,0.5,0]; const dBlue = [0,0,0.5];

		db.colorAttributeLocation = gl.getAttribLocation(db.program, "color");
		db.axisColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, db.axisColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			...red, ...red,
			...dRed, ...dRed,
			...green, ...green,
			...dGreen, ...dGreen, 
			...blue, ...blue, 
			...dBlue, ...dBlue,
		]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(db.colorAttributeLocation);
		gl.vertexAttribPointer(db.colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
	}

	// Create model->world matrix.
	db.modelToWorld = mat4.create();
    mat4.scale(db.modelToWorld, db.modelToWorld, vec3.fromValues(1.0, 1.0, 1.0));	
}