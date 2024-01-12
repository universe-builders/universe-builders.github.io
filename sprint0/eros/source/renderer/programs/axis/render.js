import { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4, glMatrix } from "../../../../../chronos/third_party/gl-matrix/index.js"
    
/**
 * @param {import("./initialize").AxisProgram} db - the program database.
 * @param {WebGL2RenderingContext} gl - the WebGL2 rendering context.
 * @param {mat4} projection - the projection matrix.
 * @param {mat4} cameraMatrix - the camera matrix.
 */
export default async function render(db, gl, projection, cameraMatrix){
    gl.useProgram(db.program);
    gl.bindVertexArray(db.VAO);
    
    /* WORLD MATRIX */
    // World matrix moves from model space to world space.
    const worldMatrixLocation = gl.getUniformLocation(db.program, "model_to_world");
    gl.uniformMatrix4fv(worldMatrixLocation, false, db.modelToWorld);

    /* VIEW MATRIX */
    // View matrix transforms the world into the view of the camera,
    // i.e. instead of applying the camera matrix to the camera, you
    // apply the inverse of the camera matrix to the world.
    const viewMatrix = mat4.invert(mat4.create(), cameraMatrix);
    const viewMatrixLocation = gl.getUniformLocation(db.program, "world_to_view");
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);

    /* PROJECTION MATRIX */
    // Projection matrix transforms camera space into screen space.
    const projectionMatrixLocation = gl.getUniformLocation(db.program, "project_view_to_clip");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projection);

    // Render.
    gl.drawArrays(gl.LINES, 0, 12);
}