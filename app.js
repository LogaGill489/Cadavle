/* -- bone class -- */
class bone {
    constructor(name, shape, direction, length, connects) {
        this.name = name;
        this.shape = shape;
        this.direction = direction;
        this.length = length;
        this.connects = connects;
    }
}

const shape = ["Flat", "Long", "Short", "Sesamoid", "Irregular"];
const directions = ["Lateral", "Medial", "Superior", "Inferior", "Anterior", "Posterior"];

const bones = [
    new bone("Femur", shape[1], "Placeholder", 45.72, 3),
    new bone("Scapula", shape[0], "Placeholder", 15.00, 2),
    new bone("Patella", shape[3], "Placeholder", 4.45, 2),
];