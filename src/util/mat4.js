import { projectionType } from "../config/constant.js";

export const mat4 = {
    scalationMatrix: function (x, y, z) {
        return [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ];
    },

    translationMatrix: function (x, y, z) {
        return [
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ];
    },

    rotationMatrix: function (x, y, z) {
        const cosX = Math.cos(x);
        const sinX = Math.sin(x);
        const cosY = Math.cos(y);
        const sinY = Math.sin(y);
        const cosZ = Math.cos(z);
        const sinZ = Math.sin(z);

        return [
            cosY * cosZ, cosX * sinZ + sinX * sinY * cosZ, sinX * sinZ - cosX * sinY * cosZ, 0,
            -cosY * sinZ, cosX * cosZ - sinX * sinY * sinZ, sinX * cosZ + cosX * sinY * sinZ, 0,
            sinY, -sinX * cosY, cosX * cosY, 0,
            0, 0, 0, 1
        ];
    },

    projectionMatrix: function (type) {
        switch (type) {
            case projectionType.ORTHOGRAPHIC:
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
            case projectionType.OBLIQUE:
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0.5, 0.5, 1, 0,
                    0, 0, 0, 1
                ];
            case projectionType.PERSPECTIVE:
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, -1,
                    0, 0, 0, 1
                ];
        }
    },

    mult: function (a, b) {
        let result = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = 0;
                for (let k = 0; k < 4; k++) {
                    result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                }
            }
        }

        return result;
    },

    inverse: function (a) {
        let result = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = this.cofactor(a, i, j);
            }
        }

        result = this.transpose(result);

        const det = this.determinant(a);

        for (let i = 0; i < 16; i++) {
            result[i] /= det;
        }

        return result;
    },

    determinant: function (a) {
        let result = 0;

        for (let i = 0; i < 4; i++) {
            result += a[i] * this.cofactor(a, 0, i);
        }

        return result;
    },

    cofactor: function (a, row, col) {
        return Math.pow(-1, row + col) * this.minor(a, row, col);
    },

    minor: function (a, row, col) {
        let result = [];

        for (let i = 0; i < 4; i++) {
            if (i == row) continue;
            for (let j = 0; j < 4; j++) {
                if (j == col) continue;
                result.push(a[i * 4 + j]);
            }
        }

        return this.determinant(result);
    },

    transpose: function (a) {
        let result = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = a[j * 4 + i];
            }
        }

        return result;
    }
};