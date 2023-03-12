const cube = {
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
}

const pyramid = {
    vertices: [
        0.0, -0.25, -0.50,
        0.0,  0.25,  0.00,
        0.5, -0.25,  0.25,
        -0.5, -0.25,  0.25,
    ],
    indices: [
        2, 1, 1, 3, 3, 2,
        3, 1, 1, 0, 0, 3,
        0, 1, 1, 2, 2, 0,
        0, 2, 2, 3, 3, 0,
    ]
} 

const octahedron = {
    vertices: [
        0, 0, 0.5,
        0.5, 0, 0,
        0, 0.5, 0,
        -0.5, 0, 0,
        0, -0.5, 0,
        0, 0, -0.5
    ],
    indices: [
        0, 1, 1, 2, 2, 0,
        0, 2, 2, 3, 3, 0,
        0, 3, 3, 4, 4, 0,
        0, 4, 4, 1, 1, 0,
        1, 4, 4, 5, 5, 1,
        1, 5, 5, 2, 2, 1,
        2, 5, 5, 3, 3, 2,
        3, 5, 5, 4, 4, 3,
    ]
}


export { cube, pyramid, octahedron }