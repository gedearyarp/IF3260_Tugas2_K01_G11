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

        mouse: {
            isDown: defaultState.mouse.isDown,
            x: defaultState.mouse.x,
            y: defaultState.mouse.y,
        },

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
        vertices: [
            // Depan
            -0.5, -0.5, 0.5, // kiri bawah depan 0
            0.5, -0.5, 0.5, // kanan bawah depan 1
            0.5, 0.5, 0.5, // kanan atas depan 2
            -0.5, 0.5, 0.5, // kiri atas depan 3
            
            // Belakang
            -0.5, -0.5, -0.5, // kiri bawah belakang 4
            0.5, -0.5, -0.5, // kanan bawah belakang 5
            0.5, 0.5, -0.5, // kanan atas belakang 6
            -0.5, 0.5, -0.5, // kiri atas belakang 7
            
            // Kanan
            0.5, -0.5, 0.5, // kanan bawah depan 1
            0.5, -0.5, -0.5, // kanan bawah belakang 5
            0.5, 0.5, -0.5, // kanan atas belakang 6
            0.5, 0.5, 0.5, // kanan atas depan 2
            
            // Kiri
            -0.5, -0.5, 0.5, // kiri bawah depan 0
            -0.5, 0.5, 0.5, // kiri atas depan 3
            -0.5, 0.5, -0.5, // kiri atas belakang 7
            -0.5, -0.5, -0.5, // kiri bawah belakang 4
            
            // Atas
            -0.5, 0.5, 0.5, // kiri atas depan 3
            0.5, 0.5, 0.5, // kanan atas depan 2
            0.5, 0.5, -0.5, // kanan atas belakang 6
            -0.5, 0.5, -0.5, // kiri atas belakang 7
            
            // Bawah
            -0.5, -0.5, 0.5, // kiri bawah depan 0
            -0.5, -0.5, -0.5, // kiri bawah belakang 4
            0.5, -0.5, -0.5, // kanan bawah belakang 5
            0.5, -0.5, 0.5 // kanan bawah depan 1
        ],
        indices: [
            0, 1, 1, 2, 2, 3, 3, 0, // Depan
            4, 5, 5, 6, 6, 7, 7, 4, // Belakang
            8, 9, 9, 10, 10, 11, 11, 8, // Kanan
            12, 13, 13, 14, 14, 15, 15, 12, // Kiri
            16, 17, 17, 18, 18, 19, 19, 16, // Atas
            20, 21, 21, 22, 22, 23, 23, 20, // Bawah
        ]
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
        state.transformation.translation.x / 100, 
        state.transformation.translation.y / 100, 
        state.transformation.translation.z / 100
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

function playAnimation() {
    state.transformation.rotation.x += 1;
    state.transformation.rotation.y += 1;
    state.transformation.rotation.z += 1;
}

function render() {
    const transformationMatrix = calculateTransformMatrix();
    const projectionMatrix = calculateProjectionMatrix();

    let program = state.shading === shadingType.LIGHT ? lightProgram : flatProgram;
    let positionLoc = gl.getAttribLocation(program, "vPosition");
    let colorLoc = gl.getUniformLocation(program, "vColor");
    let transformLoc = gl.getUniformLocation(program, "mTransform");
    let projectionLoc = gl.getUniformLocation(program, "mProjection");
    let fudgeFactorLoc = gl.getUniformLocation(program, "fudgeFactor");

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.useProgram(program);

    vertexBuffer = gl.createBuffer();
    indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    const rgbColor = hexToRgb(state.color);
    gl.uniform3f(colorLoc, rgbColor[0], rgbColor[1], rgbColor[2]);
    gl.uniform1f(fudgeFactorLoc, state.projection === projectionType.PERSPECTIVE ? 1.25 : 0);

    gl.uniformMatrix4fv(transformLoc, false, transformationMatrix);
    gl.uniformMatrix4fv(projectionLoc, false, projectionMatrix);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(glState.vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(glState.indices), gl.STATIC_DRAW);

    gl.drawElements(gl.LINES, glState.indices.length, gl.UNSIGNED_SHORT, 0);

    if (state.animation) playAnimation();

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

    requestAnimationFrame(render);
}

main();
