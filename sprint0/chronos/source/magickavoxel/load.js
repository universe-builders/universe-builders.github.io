//#region TYPES 
/** Chunk - A chunk of data in the VOX file.
 * @typedef {Object} Chunk
 * @property {number} ID
 * @property {number} bytesCount
 * @property {number} childrenCount
 * @property {number} address
 * @property {Object.<string, Chunk>} children - Map of children, key is Chunk ID, value is chunk.
 */
/** Voxel Model
 * @typedef {Object} VoxelModel
 * @property {number} voxelCount - the number of voxels in the model.
 * @property {Float32Array} voxelPositions  - the XYZ positions of the voxels.
 * @property {Uint8Array} voxelPalleteIndex - the pallette index of each voxel.
 * @property {Uint8Array} palette
 */
/** Loaded Voxels
 * @typedef {Object} LoadedVoxels
 * @property {number} voxelCount
 * @property {Float32Array} positions
 * @property {Float32Array} paletteIndicies
 */
//#endregion
//#region LOADERS
/** loadChunk - Loads a chunk into the parent chunk, all chunks are below the MAIN chunk.
 * @param {Chunk} parentChunk 
 * @param {ArrayBuffer} buffer 
 * @param {number} currentAddress 
 * @param {TextDecoder} decoder 
 * @param {DataView} dv 
 */
function loadChunk(parentChunk, buffer, currentAddress, decoder, dv){
    /* PARENT CHUNK */
    const chunkID = decoder.decode(new Uint8Array(buffer, currentAddress, 4)); currentAddress += 4;
    const chunkBytesCount = dv.getInt32(currentAddress, true); currentAddress += 4;
    const chunkChildrenCount = dv.getInt32(currentAddress, true); currentAddress += 4;

    /** @type {Chunk} */
    const chunk = {
        ID: chunkID,
        bytesCount: chunkBytesCount,
        childrenCount: chunkChildrenCount,
        address: currentAddress,
        children: {},
    };
    if(parentChunk.children[chunkID] === undefined) parentChunk.children[chunkID] = [];
    parentChunk.children[chunkID].push(chunk);
    /* PARENT CHUNK */

    currentAddress += chunkBytesCount;

    for(let i = 0; i < chunkChildrenCount; i++){
        currentAddress = loadChunk(parentChunk, buffer, currentAddress, decoder, dv);
    }

    return currentAddress;
}
/** loadPalette - Loads a pallete from a palette chunk.
 * @param {VoxelModel} voxelModel
 * @param {Chunk} paletteChunk 
 * @param {ArrayBuffer} buffer
 */
function loadPalette(voxelModel, paletteChunk, buffer){
    if(paletteChunk.ID != "RGBA"){
        throw new Error("Invalid palette chunk ID.");
    }

    const colorBuffer = buffer.slice(paletteChunk.address, paletteChunk.address + paletteChunk.bytesCount);
    voxelModel.palette = new Uint8Array(colorBuffer);
}

/** loadVoxelsFromChunks - Loads all voxels from XYZI chunks into the voxel model.
 *  Currently does not handle placing those XYZI chunks into seperate areas.
 *  I just unioned together the models in MagickaVoxel which combined the objects,
 *  instead of implementing this. ie I'm expecting only one XYZI chunk atm...
 * @param {VoxelModel} voxelModel
 * @param {Chunk[]} xyziChunks
 * @param {DataView} dv
 */
function loadVoxelsFromChunks(voxelModel, xyziChunks, dv){
    /** @type {LoadedVoxels[]} */
    const loadedVoxelModels = [];
    for(let i = 0; i < xyziChunks.length; i++){
        /** @type {LoadedVoxels} */
        const loadedVoxels = loadVoxelsFromChunk(xyziChunks[i], dv);
        loadedVoxelModels.push(loadedVoxels);
        console.log(loadedVoxels)
    }

    const voxelCount = loadedVoxelModels.reduce((acc, cur)=>acc + cur.voxelCount, 0);
    const positions = new Float32Array(voxelCount * 3);
    const paletteIndicies = new Float32Array(voxelCount);

    let currentVoxelIndex = 0;
    for(let i = 0; i < loadedVoxelModels.length; i++){
        const loadedVoxels = loadedVoxelModels[i];
        positions.set(loadedVoxels.positions, currentVoxelIndex * 3);
        paletteIndicies.set(loadedVoxels.paletteIndicies, currentVoxelIndex);
        currentVoxelIndex += loadedVoxels.voxelCount;
    }

    voxelModel.voxelCount = voxelCount;
    voxelModel.voxelPositions = positions;
    voxelModel.voxelPalleteIndex = paletteIndicies;
}
/** loadVoxels - Loads voxel positions and pallete index from a xyzi chunk.
 * @param {VoxelModel} voxelModel
 * @param {Chunk} xyziChunk
 * @param {DataView} dv
 * @returns {LoadedVoxels}
 */
function loadVoxelsFromChunk(xyziChunk, dv){
    if(xyziChunk.ID != "XYZI"){
        throw new Error("Invalid xyzi chunk ID.");
    }

    const dvv = new DataView(dv.buffer, xyziChunk.address);

    let currentAddress = xyziChunk.address;
    const voxelCount = dv.getInt32(xyziChunk.address, true); currentAddress += 4;

    const positions = new Float32Array(voxelCount * 3);
    const paletteIndicies = new Float32Array(voxelCount);
    for(let i = 0; i < voxelCount; i++){
        const x = dv.getUint8(currentAddress, true); currentAddress += 1;
        const y = dv.getUint8(currentAddress, true); currentAddress += 1;
        const z = dv.getUint8(currentAddress, true); currentAddress += 1;
        const p = dv.getUint8(currentAddress, true); currentAddress += 1;
        positions[(i * 3) + 0] = x;
        positions[(i * 3) + 2] = y;
        positions[(i * 3) + 1] = z;
        paletteIndicies[i] = (p - 1)/256;
        //paletteIndicies[(i * 3) + 2] = p - 1;
        //paletteIndicies[(i * 3) + 1] = p - 1;
    }

    return {
        voxelCount,
        positions,
        paletteIndicies,
    }
}
//#endregion

/**
 * 
 * @param {VoxelModel} voxelModel - to initialize.
 * @param {string} path - the path of the asset. 
 */
export default async function load(voxelModel, path){
    //#region Load File
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const dv = new DataView(buffer);
    const decoder = new TextDecoder("utf-8");
    //#endregion

    //#region Load Header
    let currentAddress = 0;
    const magicString = decoder.decode(new Uint8Array(buffer, currentAddress, 4)); currentAddress += 4;
    if(magicString != "VOX "){
        throw new Error("Invalid magic string.");
    }
    const version = dv.getInt32(currentAddress); currentAddress += 4;
    //#endregion

    //#region Load Chunks
    /** @type {Object.<string, Chunk[]>} - Map of chunks, ID is Chunk ID, value is array of chunks of that ID. */
    const chunks = {};

    //#region Load main chunk
    const mainChunkID = decoder.decode(new Uint8Array(buffer, currentAddress, 4)); currentAddress += 4;
    const mainChunkBytesCount = dv.getInt32(currentAddress, true); currentAddress += 4;
    const mainChunkChildrenCount = dv.getInt32(currentAddress, true); currentAddress += 4;
    if(mainChunkID != "MAIN"){
        throw new Error("Invalid main chunk ID.");
    }
    chunks[mainChunkID] = [];
    const mainChunk = {
        ID: mainChunkID,
        bytesCount: mainChunkBytesCount,
        childrenCount: mainChunkChildrenCount,
        address: currentAddress,
        children: {},
    };
    chunks[mainChunkID].push(mainChunk);
    //#endregion

    //#region Load children chunks
        while(currentAddress < buffer.byteLength){
            currentAddress = loadChunk(mainChunk, buffer, currentAddress, decoder, dv);
        }
    //#endregion
    //#endregion

    console.log(chunks)

    //#region Load Palette.
    loadPalette(voxelModel, chunks["MAIN"][0].children["RGBA"][0], buffer);
    //#endregion

    for(let i = 0; i < chunks["MAIN"][0].children["SIZE"].length; i++){
        const sizeChunk = chunks["MAIN"][0].children["SIZE"][i];
        const dvv = new DataView(buffer, sizeChunk.address);
        const x = dvv.getInt32(0, true);
        const y = dvv.getInt32(4, true);
        const z = dvv.getInt32(8, true);
    }

    //#region Load Model
    loadVoxelsFromChunks(voxelModel, chunks["MAIN"][0].children["XYZI"], dv);
    //#endregion
}