"use strict"
import initializeRenderer from "../../eros/source/renderer/initialize.js";
import update from "./update.js";
import render from "../../eros/source/renderer/render.js";
import clearRenderer from "../../eros/source/renderer/clear.js";

import initializeInput from "./input/initialize.js";
import updateInput from "./input/update.js";
import renderTouchInput from "./input/renderTouchInput.js";

import loadMagickaVoxelModel from "./magickavoxel/load.js"

import { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4, glMatrix } from "../third_party/gl-matrix/index.js"

document.addEventListener("DOMContentLoaded", main, false);

/**
 * @typedef {Object} ChronusDatabase
 * @property {WebAssembly.Memory} memory
 * @property {WebAssembly.Instance} module
 * @property {import("./input/initialize").InputDatabase} input
 * @property {import("../../eros/source/renderer/initialize").Renderer} renderer
 * @property {number} heapBase
 * @property {number} playerAddress
 * @property {number} voxelsAddress
 * @property {DataView} memoryDataView
 * @property {number} previousFrameStartMS
 * @property {import("./magickavoxel/load").VoxelModel} roomModel
 */

function console_log(address){
	var dv = new DataView(db.memory.buffer, 0);
	var string = "";
	let char = null;
	do{
		char = String.fromCharCode(dv.getUint8(address));
		if(char == "\0") break;
		string += char;
		address++;
	} while(true);

	console.log(string);
}

async function wasmLoad(db, fileName) {

	db.memory = new WebAssembly.Memory({ initial: 4, maximum: 4 });

	var imports = {
		env: {
			console_log,
			cosf: Math.cos,
			sinf: Math.sin,
			sqrtf: Math.sqrt,
			cross: (outAddress, aAddress, bAddress)=>{
				const dv = new DataView(db.memory.buffer, 0);
				const out = new Float32Array(dv.buffer, outAddress, 3);
				const a = new Float32Array(dv.buffer, aAddress, 3);
				const b = new Float32Array(dv.buffer, bAddress, 3);
				vec3.cross(out, a, b);
			},
			scale: (outAddress, aAddress, scalar)=>{
				const dv = new DataView(db.memory.buffer, 0);
				const out = new Float32Array(dv.buffer, outAddress, 3);
				const a = new Float32Array(dv.buffer, aAddress, 3);
				vec3.scale(out, a, scalar);
			},
			memory: db.memory
		}
	};

	var request = new XMLHttpRequest();
	request.open("GET", fileName);
	request.responseType = "arraybuffer";
	request.send();

    const response = new Promise((resolve, reject) => {
        request.onload = function() {

            var wasmSource = request.response;
            var wasmModule = new WebAssembly.Module(wasmSource);
            var wasmInstance = new WebAssembly.Instance(wasmModule, imports);
            db.module = wasmInstance.exports;
            resolve();
        } // XMLHttpRequest.onload();
        request.onerror = reject;
    });

	return response;
} // loadWasm()

async function main() {
	/** @type {ChronusDatabase} */
	const db = {
		memory: null,
		module: null,
		input: {},
		renderer: {},
		heapBase: 0,
		playerAddress: 0,
		voxelsAddress: 0,
		memoryDataView: null,
		previousFrameStartMS: 0
	};
	window.db = db;
	
	initializeInput(db.input);

	await wasmLoad(db, "/falacer/build/main.wasm");
	db.heapBase = db.module.__heap_base.value;
	db.memoryDataView = new DataView(db.memory.buffer, 0);

	// Set up some random floats in memory.
	for(let i = 0; i < 10000; i++) {
		db.memoryDataView.setFloat32( db.heapBase + (i * 4), Math.random(), true );
	}

    db.module.initialize();
	db.playerAddress = db.module.get_player();
	db.voxelsAddress = db.module.get_voxels();

	await initializeRenderer(db.renderer, document.querySelector("#webgl"));

	db.previousFrameEndMS = performance.now();
	
	db.roomModel = {};
	await loadMagickaVoxelModel(db.roomModel, "/chronos/models/dungeon.vox");

	console.log(db.roomModel)

	requestAnimationFrame(()=>{update(db)});

	/*
	const hexDump = "";
	for(let i = 0; i < 100; i++) {
		console.log( `${i} 0x${dv.getUint8(i).toString(16).toUpperCase()}` );
	}
	*/

	


} // main()
