import { Point, HollowObject } from "./config/shape.js";
import { vertCode3D, fragCode3D, generateShaderProgram } from "./config/shader-generator.js";
import { projectionType, shadingType, shapeType, defaultColor } from "./config/constant.js";
import { configureEventListener } from "./config/event-listener.js";

let state;
let lightProgram, flatProgram;
let vertexBuffer, indexBuffer;

function checkBrowserCompatibility(gl) {
    if (!gl) {
        alert("WebGL tidak tersedia di browser ini.");
        return false;
    }
    return true;
}

function resetState() {
    state = {
        shape: shapeType.CUBE,
        projection: projectionType.ORTHOGRAPHIC,
        color: defaultColor,
    
        shading: shadingType.LIGHT,
        animation: false,
    
        transformation: {
            translation: {
                x: 0,
                y: 0,
                z: 0,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
            scalation: {
                x: 1,
                y: 1,
                z: 1,
            },
        },
        camera: {
            radius: 0,
            rotation: 0,
        },
    };
}

function render() {
    console.log(state);
    requestAnimationFrame(render);
}

function main() {
    resetState();
    configureEventListener(state);

    const canvas = document.getElementById("my-canvas");
    const gl = canvas.getContext("webgl");

    if (!checkBrowserCompatibility(gl)) return;

    lightProgram = generateShaderProgram(gl, vertCode3D, fragCode3D.light);
    flatProgram = generateShaderProgram(gl, vertCode3D, fragCode3D.flat); 

    gl.useProgram(lightProgram);

    vertexBuffer = gl.createBuffer();
    indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    requestAnimationFrame(render);
}

main();