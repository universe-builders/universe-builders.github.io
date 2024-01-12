/**
 * @typedef {Object} VoxelProgram
 * @property {WebGLProgram} program - the WebGL voxelProgram.
 * @property {WebGLVertexArrayObject} VAO - the WebGL vertex array object.
 * @property {WebGLBuffer} vertexBuffer - a buffer of voxel vertices.
 * @property {WebGLBuffer} colorBuffer - a buffer of colors.
 * @property {WebGLBuffer} textureCoordinateBuffer - the buffer of texture coordinates for voxels.
 * @property {WebGLTexture} texture - the texture ID.
 * @property {WebGLInt} textureCoordinateLocation - the WebGL color attribute location.
 * @property {WebGLBuffer} worldTranslationsBuffer - a buffer containing the world translations of each voxel.
 * @property {WebGLInt} worldTranslationAttributeLocation - the location of the world_translation attribute in the shader.
 */

/**
 * Initializes the provided db with the renderer database.
 * @param {import("../../initialize").RendererDatabase} db - the renderer database to initialize.
 * @param {WebGL2RenderingContext} gl - the WebGL2 rendering context.
 */
export default async function initializeVoxelProgram(db, gl) {
	
	/* LOAD SHADERS */
	const vertexShaderSource = await (await fetch("/eros/source/shaders/voxel.vert") ).text();
	const fragmentShaderSource = await (await fetch("/eros/source/shaders/voxel.frag") ).text();

	/* CREATE PROGRAM */
	db.program = webglUtils.createProgramFromSources(gl, [vertexShaderSource, fragmentShaderSource]);
	gl.useProgram(db.program);

	/* CREATE VAO */
	db.VAO = gl.createVertexArray();
	gl.bindVertexArray(db.VAO);

	/* CONSTRUCT VERTEX BUFFER */
	{
		db.vertexBuffer = gl.createBuffer();
		const vertexAttributeLocation = gl.getAttribLocation(db.program, "model_vertex");
		gl.enableVertexAttribArray(vertexAttributeLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, db.vertexBuffer);
		const v0 = [-0.5, 0.5, 0.5];
		const v1 = [-0.5, -0.5, 0.5];
		const v2 = [0.5, -0.5, 0.5];
		const v3 = [0.5, 0.5, 0.5]
		const v4 = [-0.5, 0.5, -0.5];
		const v5 = [-0.5, -0.5, -0.5];
		const v6 = [0.5, -0.5, -0.5];
		const v7 = [0.5, 0.5, -0.5];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			// +Z face.
			...v0, ...v1, ...v2,
			...v0, ...v2, ...v3,
			// +Y face.
			...v4, ...v0, ...v3,
			...v4, ...v3, ...v7,
			// -Z face.
			...v7, ...v6, ...v5,
			...v7, ...v5, ...v4,
			// -Y face.
			...v1, ...v5, ...v6,
			...v1, ...v6, ...v2,
			// -X face.
			...v4, ...v5, ...v1,
			...v4, ...v1, ...v0,
			// +X face.
			...v3, ...v2, ...v6,
			...v3, ...v6, ...v7,
		]), gl.STATIC_DRAW);
	
		// Tell the attribute how to get data out of vertexBuffer (ARRAY_BUFFER)
		var size = 3;          // 3 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(vertexAttributeLocation, size, type, normalize, stride, offset);
	}

	/* CREATE WORLD TRANSLATIONS BUFFER */
	db.worldTranslationAttributeLocation = gl.getAttribLocation(db.program, "world_translation");
	db.worldTranslationsBuffer = gl.createBuffer();
	gl.enableVertexAttribArray(db.worldTranslationAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, db.worldTranslationsBuffer);
	gl.vertexAttribPointer(db.worldTranslationAttributeLocation, 3, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(db.worldTranslationAttributeLocation, 1);
	
	// Turn on the attribute
	db.textureCoordinateLocation = gl.getAttribLocation(db.program, "texture_coordinate");
	db.textureCoordinateBuffer = gl.createBuffer();
	gl.enableVertexAttribArray(db.textureCoordinateLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, db.textureCoordinateBuffer);
	gl.vertexAttribPointer(db.textureCoordinateLocation, 1, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(db.textureCoordinateLocation, 1);
	
	db.texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0 + 0);
	gl.bindTexture(gl.TEXTURE_2D, db.texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	/* CREATE COLORS BUFFER */
	/*
	db.colorAttributeLocation = gl.getAttribLocation(db.program, "color");
	db.colorBuffer = gl.createBuffer();
	gl.enableVertexAttribArray(db.colorAttributeLocation);
	gl.vertexAttribPointer(db.colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
	gl.vertexAttribDivisor(db.colorAttributeLocation, 1);
	*/
}
