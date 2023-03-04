import { Point, HollowObject } from "./config/shape.js";
import { vertCode3D, fragCode3D, generateShaderProgram } from "./util/shader-generator.js";
import { projectionType, shadingType, shapeType, defaultState } from "./config/constant.js";
import { configureEventListener } from "./util/event-listener.js";

let state, glState;
let lightProgram, flatProgram;
let vertexBuffer, indexBuffer;

function checkBrowserCompatibility(gl) {
    if (!gl) {
        alert("WebGL tidak tersedia di browser ini.");
        return false;
    }
    return true;
}

function generateState() {
    state = {
        shape: defaultState.shape,
        projection: defaultState.projection,
        color: defaultState.color,
    
        shading: defaultState.shading,
        animation: defaultState.animation,
    
        transformation: {
            translation: {
                x: defaultState.transformation.translation.x,
                y: defaultState.transformation.translation.y,
                z: defaultState.transformation.translation.z,
            },
            rotation: {
                x: defaultState.transformation.rotation.x,
                y: defaultState.transformation.rotation.y,
                z: defaultState.transformation.rotation.z,
            },
            scalation: {
                x: defaultState.transformation.scalation.x,
                y: defaultState.transformation.scalation.y,
                z: defaultState.transformation.scalation.z,
            },
        },
        camera: {
            radius: defaultState.camera.radius,
            rotation: defaultState.camera.rotation,
        },
    };

    glState = {
        vertices: new Float32Array([]),
        indices: new Uint16Array([]),
    };
}

function render() {
    console.log(state);
    requestAnimationFrame(render);
}

function main() {
    generateState();
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
