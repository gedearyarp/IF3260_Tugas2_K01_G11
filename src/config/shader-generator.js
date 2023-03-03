const vertCode3D = `
    TODO
`

const fragCode3D = {
    light: `
        TODO
    `,
    flat: `
        TODO
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