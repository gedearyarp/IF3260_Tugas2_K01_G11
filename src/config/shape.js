class Point {
    coordinate = { x: 0, y: 0, z: 0 };
    color = { r: 0, g: 0, b: 0 };

    constructor(x, y, z, r, g, b) {
        this.coordinate.x = x;
        this.coordinate.y = y;
        this.coordinate.z = z;

        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }
}

class HollowObject {
    points = [];
    relations = [];

    constructor() {}

    addPoint(x, y, z, r, g, b) {
        this.points.push(new Point(x, y, z, r, g, b));
    }

    addRelation(a, b) {
        this.relations.push([a, b]);
    }
}

export { Point, HollowObject }
