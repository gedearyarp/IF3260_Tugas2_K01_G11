import { shadingType, projectionType, shapeType, defaultState } from "./constant.js";

function colorEventListener(state) {
    document.getElementById("color-picker").addEventListener("change", (event) => {
        state.color = event.target.value;
        console.log(state.color);
    });
}

function shapeEventListener(state) {
    document.getElementById("cube").addEventListener("change", (event) => {
        state.shape = shapeType.CUBE;
    });

    document.getElementById("pyramid").addEventListener("change", (event) => {
        state.shape = shapeType.PYRAMID;
    });

    document.getElementById("octahedron").addEventListener("change", (event) => {
        state.shape = shapeType.OCTAHEDRON;
    });
}

function projectionEventListener(state) {
    document.getElementById("orthographic").addEventListener("change", (event) => {
        state.projection = projectionType.ORTHOGRAPHIC;
    });

    document.getElementById("oblique").addEventListener("change", (event) => {
        state.projection = projectionType.OBLIQUE;
    });

    document.getElementById("perspective").addEventListener("change", (event) => {
        state.projection = projectionType.PERSPECTIVE;
    });
}

function translationEventListener(state) {
    document.getElementById("translation-x").addEventListener("input", (event) => {
        state.transformation.translation.x = event.target.value;
    });

    document.getElementById("translation-y").addEventListener("input", (event) => {
        state.transformation.translation.y = event.target.value;
    });

    document.getElementById("translation-z").addEventListener("input", (event) => {
        state.transformation.translation.z = event.target.value;
    });
}

function rotationEventListener(state) {
    document.getElementById("rotation-x").addEventListener("change", (event) => {
        state.transformation.rotation.x = event.target.value;
    });

    document.getElementById("rotation-y").addEventListener("input", (event) => {
        state.transformation.rotation.y = event.target.value;
    });

    document.getElementById("rotation-z").addEventListener("input", (event) => {
        state.transformation.rotation.z = event.target.value;
    });
}

function scalationEventListener(state) {
    document.getElementById("scalation-x").addEventListener("input", (event) => {
        state.transformation.scalation.x = event.target.value;
    });

    document.getElementById("scalation-y").addEventListener("input", (event) => {
        state.transformation.scalation.y = event.target.value;
    });

    document.getElementById("scalation-z").addEventListener("input", (event) => {
        state.transformation.scalation.z = event.target.value;
    });
}

function cameraEventListener(state) {
    document.getElementById("camera-radius").addEventListener("input", (event) => {
        state.camera.radius = event.target.value;
    });

    document.getElementById("camera-rotation").addEventListener("input", (event) => {
        state.camera.rotation = event.target.value;
    });
}

function utilityEventListener(state) {
    document.getElementById("shading").addEventListener("click", (event) => {
        state.shading = event.target.checked ? shadingType.LIGHT : shadingType.FLAT;
    });

    document.getElementById("animation").addEventListener("change", (event) => {
        state.animation = event.target.checked;
    });
}

function resetEventListener(state) {
    function setDefaultState() {
        state.shape = defaultState.shape;
        state.projection = defaultState.projection;
        state.color = defaultState.color;

        state.shading = defaultState.shading;
        state.animation = defaultState.animation;

        state.transformation.translation.x = defaultState.transformation.translation.x;
        state.transformation.translation.y = defaultState.transformation.translation.y;
        state.transformation.translation.z = defaultState.transformation.translation.z;

        state.transformation.rotation.x = defaultState.transformation.rotation.x;
        state.transformation.rotation.y = defaultState.transformation.rotation.y;
        state.transformation.rotation.z = defaultState.transformation.rotation.z;

        state.transformation.scalation.x = defaultState.transformation.scalation.x;
        state.transformation.scalation.y = defaultState.transformation.scalation.y;
        state.transformation.scalation.z = defaultState.transformation.scalation.z;

        state.camera.radius = defaultState.camera.radius;
        state.camera.rotation = defaultState.camera.rotation;
    }

    function setDefaultUI() {
        document.getElementById("color-picker").value = state.color;

        document.getElementById("cube").checked = state.shape === shapeType.CUBE;
        document.getElementById("pyramid").checked = state.shape === shapeType.PYRAMID;
        document.getElementById("octahedron").checked = state.shape === shapeType.OCTAHEDRON;

        document.getElementById("orthographic").checked = state.projection === projectionType.ORTHOGRAPHIC;
        document.getElementById("oblique").checked = state.projection === projectionType.OBLIQUE;
        document.getElementById("perspective").checked = state.projection === projectionType.PERSPECTIVE;

        document.getElementById("translation-x").value = state.transformation.translation.x;
        document.getElementById("translation-y").value = state.transformation.translation.y;
        document.getElementById("translation-z").value = state.transformation.translation.z;

        document.getElementById("translation-x").nextElementSibling.value = state.transformation.translation.x;
        document.getElementById("translation-y").nextElementSibling.value = state.transformation.translation.y;
        document.getElementById("translation-z").nextElementSibling.value = state.transformation.translation.z;

        document.getElementById("rotation-x").value = state.transformation.rotation.x;
        document.getElementById("rotation-y").value = state.transformation.rotation.y;
        document.getElementById("rotation-z").value = state.transformation.rotation.z;

        document.getElementById("rotation-x").nextElementSibling.value = state.transformation.rotation.x;
        document.getElementById("rotation-y").nextElementSibling.value = state.transformation.rotation.y;
        document.getElementById("rotation-z").nextElementSibling.value = state.transformation.rotation.z;

        document.getElementById("scalation-x").value = state.transformation.scalation.x;
        document.getElementById("scalation-y").value = state.transformation.scalation.y;
        document.getElementById("scalation-z").value = state.transformation.scalation.z;

        document.getElementById("scalation-x").nextElementSibling.value = state.transformation.scalation.x;
        document.getElementById("scalation-y").nextElementSibling.value = state.transformation.scalation.y;
        document.getElementById("scalation-z").nextElementSibling.value = state.transformation.scalation.z;

        document.getElementById("camera-radius").value = state.camera.radius;
        document.getElementById("camera-rotation").value = state.camera.rotation;

        document.getElementById("camera-radius").nextElementSibling.value = state.camera.radius;
        document.getElementById("camera-rotation").nextElementSibling.value = state.camera.rotation;

        document.getElementById("shading").checked = state.shading === shadingType.LIGHT;
        document.getElementById("animation").checked = state.animation;
    }

    document.getElementById("reset-default").addEventListener("click", (event) => {
        setDefaultState();
        setDefaultUI();
    });
}

function fileEventListener(state) {
    document.getElementById("save-data").addEventListener("click", (event) => {
        console.log(event.target.value);
    });

    document.getElementById("load-data").addEventListener("click", (event) => {
        console.log(event.target.value);
    });
}

function configureEventListener(state) {
    colorEventListener(state);
    shapeEventListener(state);
    projectionEventListener(state);

    translationEventListener(state);
    rotationEventListener(state);
    scalationEventListener(state);

    utilityEventListener(state);
    cameraEventListener(state);

    resetEventListener(state);
    fileEventListener(state);
}

export { configureEventListener };