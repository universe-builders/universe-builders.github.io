import { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4, glMatrix } from "/chronos/third_party/gl-matrix/index.js"

/**
 * 
 * @param {import("./initialize").VoxelProgram} db 
 * @param {WebGL2RenderingContext} gl 
 * @param {number} voxelCount 
 * @param {Float32Array} positions 
 * @param {Uint8Array} textureCoordinates
 * @param {Uint8Array} palette
 * @param {mat4} cameraMatrix 
 */
export default function renderVoxels(db, gl, projection, voxelCount, positions, textureCoordinates, palette, cameraMatrix){
    /* Setup Program */
    gl.useProgram(db.program);
    gl.bindVertexArray(db.VAO);

    /* Buffer Texture */
    gl.bindTexture(gl.TEXTURE_2D, db.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, palette);
    //gl.generateMipmap(gl.TEXTURE_2D);

    /* Texture Coords */
	gl.bindBuffer(gl.ARRAY_BUFFER, db.textureCoordinateBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates, gl.DYNAMIC_DRAW);

    /* Translation */
    gl.bindBuffer(gl.ARRAY_BUFFER, db.worldTranslationsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    /*

    //#region Coloring faces in coordinate directions.
    /*
    const red = [1,0,0]; const green = [0,1,0]; const blue = [0,0,1];
    const dRed = [0.5,0,0]; const dGreen = [0,0.5,0]; const dBlue = [0,0,0.5];
    // COLORING FACES MATCH COORDINATE DIRECTION COLORS
    db.colorAttributeLocation = gl.getAttribLocation(db.program, "color");
	db.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, db.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        ...blue,...blue,...blue,...blue,...blue,...blue,                // +Z
        ...green,...green,...green,...green,...green,...green,          // +Y
        ...dBlue,...dBlue,...dBlue,...dBlue,...dBlue,...dBlue,          // -Z
        ...dGreen,...dGreen,...dGreen,...dGreen,...dGreen,...dGreen,    // -Y
        ...dRed,...dRed,...dRed,...dRed,...dRed,...dRed,                // -X
        ...red,...red,...red,...red,...red,...red,                      // +X
    ]), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(db.colorAttributeLocation);
	gl.vertexAttribPointer(db.colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    */
    //#endregion

    /* WORLD MATRIX */
    // World matrix is constructed in the shader from the world translation.
    // Voxels currently do not have scale, rotation, or any other properties.
    
    /* VIEW MATRIX */
    const viewMatrix = mat4.invert(mat4.create(), cameraMatrix);
    const viewMatrixLocation = gl.getUniformLocation(db.program, "world_to_view");
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);

    /* PROJECTION MATRIX */
    const projectionMatrixLocation = gl.getUniformLocation(db.program, "project_view_to_clip");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projection);

    // Render.
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 36, voxelCount);
}