/**
 * @param {RendererDatabase} db - the program database.
*/
export default function clear(db){
    // Resize canvas and viewport.
    webglUtils.resizeCanvasToDisplaySize(db.gl.canvas);
    db.gl.viewport(0, 0, db.gl.canvas.width, db.gl.canvas.height);

    // Clear the canvas.
    db.gl.clearColor(0, 0, 0, 0);
    db.gl.clear(db.gl.COLOR_BUFFER_BIT | db.gl.DEPTH_BUFFER_BIT);
}