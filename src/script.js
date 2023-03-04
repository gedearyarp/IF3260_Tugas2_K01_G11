import { Point, HollowObject } from "./config/shape.js";
import { generateShaderProgram } from "./config/shader-generator.js";

let objectState;

function setupEventListeners() {

}

function render() {

    requestAnimationFrame(render);
}

function main() {
    setupEventListeners();

    const canvas = document.getElementById("my-canvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert("WebGL tidak tersedia di browser ini.");
        return;
    }


}

main();