const vertCode3D = `
    attribute vec3 vPosition;
    uniform float fudgeFactor;

    uniform mat4 matTransform;
    uniform mat4 matProjection;
    varying float color;

    void main(void) {
        vec4 transformedPos = matTransform * vec4(vPosition.xy, vPosition.z * -1.0, 1.0);
        vec4 projectedPos   = matProjection * transformedPos;
        if (fudgeFactor < 0.01) gl_Position = projectedPos;
        else {
            float zDivider = 2.0 + projectedPos.z * fudgeFactor;
            gl_Position = vec4(projectedPos.xy / zDivider, projectedPos.zw);
        }
        color = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);
    }
`

const fragCode3D = {
    light: `
        precision mediump float;
        uniform vec3 vColor;
        varying float color;

        void main(void) {
            gl_FragColor = vec4(vColor * color, 1.0);
        }
    `,
    flat: `
        precision mediump float;
        uniform vec3 vColor;
        varying float color;

        void main(void) {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `
}

function generateShaderProgram (gl, vertCode, fragCode) {
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        console.log('Program tidak dapat digunakan');
        return;
    }

    return program;
}

export { generateShaderProgram, vertCode3D, fragCode3D };
