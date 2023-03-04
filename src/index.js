import { vertCode3D, fragCode3D, generateShaderProgram } from "./util/shader-generator.js";
import { projectionType, shadingType, shapeType, defaultState } from "./config/constant.js";
import { configureEventListener } from "./event-listener.js";
import { mat4 } from "./util/mat4.js";

let gl, canvas;
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

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return [r / 255, g / 255, b / 255];
}

function calculateTransformMatrix() {
    const translationMatrix = mat4.translationMatrix(
        state.transformation.translation.x, 
        state.transformation.translation.y, 
        state.transformation.translation.z
    );

    const rotationMatrix = mat4.rotationMatrix(
        state.transformation.rotation.x * Math.PI / 180,
        state.transformation.rotation.y * Math.PI / 180,
        state.transformation.rotation.z * Math.PI / 180
    );

    const scalationMatrix = mat4.scalationMatrix(
        state.transformation.scalation.x,
        state.transformation.scalation.y,
        state.transformation.scalation.z
    );

    return mat4.mult(translationMatrix, mat4.mult(rotationMatrix, scalationMatrix));
}

function calculateProjectionMatrix() {
    const projectionMatrix = mat4.projectionMatrix(state.projection);
    const rotationMatrix = mat4.rotationMatrix(0, state.camera.rotation * Math.PI / 180, 0);
    const translationMatrix = mat4.translationMatrix(0, 0, state.camera.radius);

    return mat4.mult(projectionMatrix, mat4.mult(rotationMatrix, translationMatrix));
}

function render() {
    const transformationValue = calculateTransformMatrix();
    const projectionValue = calculateProjectionMatrix();

    let program = state.shading === shadingType.LIGHT ? lightProgram : flatProgram;
    let positionLoc = gl.getAttribLocation(program, "vPosition");
    let colorLoc = gl.getUniformLocation(program, "vColor");
    let transformLoc = gl.getUniformLocation(program, "matTransform");
    let projectionLoc = gl.getUniformLocation(program, "matProjection");
    let fudgeFactorLoc = gl.getUniformLocation(program, "fudgeFactor");

    gl.useProgram(program);

    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    gl.uniform3fv(colorLoc, hexToRgb(state.color));
    gl.uniformMatrix4fv(transformLoc, false, transformationValue);
    gl.uniformMatrix4fv(projectionLoc, false, projectionValue);
    gl.uniform1f(fudgeFactorLoc, state.projection === projectionType.PERSPECTIVE ? 1.25 : 0);

    gl.bufferData(gl.ARRAY_BUFFER, glState.vertices, gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glState.indices, gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLES, glState.indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(render);
}

function main() {
    generateState();
    configureEventListener(state);

    canvas = document.getElementById("my-canvas");
    gl = canvas.getContext("webgl");

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
