import { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4, glMatrix } from "../../../chronos/third_party/gl-matrix/index.js"
import renderAxisLines from "./programs/axis/render.js";   
import renderVoxels from "./programs/voxel/render.js"; 

/**
 * @param {import("./initialize").RendererDatabase} db - the program database.
 * @param {vec3} cameraPosition - the camera position.
 * @param {vec3} cameraForward - the camera forward direction.
 * @param {number} voxelCount - the number of voxels to render.
 * @param {Float32Array} voxelPositions - a buffer of positions in {x, y, z} packing.
 * @param {Uint8Array} voxelTextureCoordinates - a buffer of texture 1D coordinates.
 * @param {Uint8Array} palette - the palette to use for coloring voxels.
 */
export default function render(db, cameraPosition, cameraForward, voxelCount, voxelPositions, voxelTextureCoordinates, palette){
    
    /* PROJECTION MATRIX */
	const fieldOfViewRadians = glMatrix.toRadian(60);
    const aspect = db.gl.canvas.clientWidth / db.gl.canvas.clientHeight;
    const zNear = 1;
    const zFar = 1000;
    db.projection = mat4.perspective(mat4.create(), fieldOfViewRadians, aspect, zNear, zFar);

    /* CAMERA MATRIX */
    const worldUp = vec3.fromValues(0,1,0);
    const target = vec3.fromValues( cameraPosition[0] + cameraForward[0], cameraPosition[1] + cameraForward[1], cameraPosition[2] + cameraForward[2]);
    const cameraMatrix = mat4.targetTo(mat4.create(), cameraPosition, target, worldUp);

    // Render.
    renderAxisLines(db.axisProgram, db.gl, db.projection, cameraMatrix);
    renderVoxels(db.voxelProgram, db.gl, db.projection, voxelCount, voxelPositions, voxelTextureCoordinates, palette, cameraMatrix);

    //db, gl, projection, voxelCount, positions, textureCoordinates, palette, cameraMatrix
}


