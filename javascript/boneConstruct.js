/* -- bone class -- */
export class Bone {
    constructor(name, shape, position, length, connects, grouping, wikiGroup) {
        this.name = name;
        this.shape = shape;
        this.position = position;
        this.length = length;
        this.connects = connects;
        this.grouping = grouping;
        this.wikiGroup = wikiGroup || 0; // Default to 0 if not provided
    }
}

/*
-- directional coordinates --
Starting from the floor, we go upwards in the z, coronal plane is parallel with x-axis, sagital plane is parallel with y-axis
Directional Types:
"Lateral", "Medial", "Superior", "Inferior", "Anterior", "Posterior", "Distal", "Proximal"

Shape Types:
"Flat", "Long", "Short", "Sesamoid", "Irregular"
*/

export const bones = [
    // Cranial bones
    new Bone("Occipital", "Flat", { x: 0, y: 11.1, z: -0.7 }, 2.32, 6, 2, 3),
    new Bone("Parietal", "Flat", { x: 0.3, y: 11.5, z: -0.5 }, 7.2, 5, 2, 3),
    new Bone("Frontal", "Flat", { x: 0, y: 11.6, z: 0.2 }, 12.0, 12, 2, 3),
    new Bone("Temporal", "Irregular", { x: 0.7, y: 10.9, z: -0.4 }, 2.5, 5, 2, 3),
    new Bone("Sphenoid", "Irregular", { x: 0, y: 10.8, z: -0.2 }, 2.2, 12, 2, 3),
    new Bone("Ethmoid", "Irregular", { x: 0, y: 11, z: 0.2 }, 2.5, 13, 2, 3),

    // Facial bones
    new Bone("Nasal", "Flat", { x: 0, y: 11.1, z: 0.5 }, 2.0, 4, 2, 3),
    new Bone("Maxilla", "Irregular", { x: 0, y: 10.7, z: 0.7 }, 6.0, 9, 2),
    new Bone("Lacrimal", "Flat", { x: 0.2, y: 11, z: 0.5 }, 1.0, 4, 2, 3),
    new Bone("Zygomatic", "Irregular", { x: 0.7, y: 10.9, z: 0.4 }, 3.0, 4, 2, 3),
    new Bone("Palatine", "Irregular", { x: 0.1, y: 10.6, z: 0.2 }, 2.0, 6, 2, 3),
    new Bone("Inferior Nasal Concha", "Irregular", { x: 0.1, y: 10.6, z: 0.5 }, 1.5, 3, 2),
    new Bone("Vomer", "Flat", { x: 0, y: 10.5, z: 0.3 }, 1.5, 6, 2),
    new Bone("Hyoid", "Irregular", { x: 0, y: 9.8, z: 0.4 }, 1.2, 0, 2, 3),
    new Bone("Mandible", "Irregular", { x: 0, y: 10.2, z: 0.7 }, 8.0, 2, 2),

    // Ear bones
    new Bone("Malleus", "Irregular", { x: 0.93, y: 10.9, z: -0.4 }, 0.85, 3, 2),
    new Bone("Incus", "Irregular", { x: 0.92, y: 10.9, z: -0.4 }, 0.7, 2, 2),
    new Bone("Stapes", "Irregular", { x: 0.91, y: 10.9, z: -0.4 }, 0.3, 2, 2),

    // Carpals - grouped checked
    new Bone("Scaphoid", "Short", { x: 2.0, y: 5.4, z: 0 }, 2.8, 5, 1, 3),
    new Bone("Lunate", "Short", { x: 1.7, y: 5.4, z: 0 }, 2.0, 5, 1, 3),
    new Bone("Triquetrum", "Short", { x: 1.59, y: 5.3, z: 0 }, 2.0, 3, 1, 3),
    new Bone("Pisiform", "Short", { x: 1.59, y: 5.3, z: 0.2 }, 1.5, 1, 1, 3),
    new Bone("Trapezium", "Short", { x: 2.1, y: 5.1, z: 0 }, 1.8, 4, 1, 1),
    new Bone("Trapezoid", "Short", { x: 1.9, y: 5.1, z: 0 }, 1.7, 4, 1, 3),
    new Bone("Capitate", "Short", { x: 1.8, y: 5.1, z: 0 }, 2.9, 7, 1, 3),
    new Bone("Hamate", "Short", { x: 1.5, y: 5.1, z: 0 }, 2.3, 5, 1, 3),

    // Metacarpals + Phalanges - grouped checked
    new Bone("Metacarpals", "Long", { x: 1.8, y: 4.7, z: 0 }, 5.0, 2, 1, 2),
    new Bone("Hand Phalanges", "Long", { x: 1.8, y: 4.2, z: 0 }, 2.5, 2, 1, 4),

    // Upper limbs - checked
    new Bone("Humerus", "Long", { x: 1.5, y: 8.2, z: 0 }, 35.0, 3, 1),
    new Bone("Ulna", "Long", { x: 1.8, y: 6.0, z: 0 }, 26.0, 2, 1),
    new Bone("Radius", "Long", { x: 2.0, y: 6.0, z: 0 }, 24.0, 4, 1, 1),

    // Sternum bones - checked
    new Bone("Manubrium", "Flat", { x: 0, y: 9.7, z: 0.8 }, 5.0, 2, 2, 5),
    new Bone("Body of Sternum", "Flat", { x: 0, y: 9.3, z: 0.8 }, 12.0, 2, 2, 5),
    new Bone("Xiphoid Process", "Flat", { x: 0, y: 8.9, z: 0.8 }, 2.5, 1, 2, 5),

    // Clavicle & Scapula - checked
    new Bone("Clavicle", "Long", { x: 1.1, y: 9.2, z: -0.2 }, 14.0, 2, 2),
    new Bone("Scapula", "Flat", { x: 0.5, y: 9.4, z: -0.4 }, 15.0, 2, 2),

    // Ribs - grouped and checked
    new Bone("True Ribs", "Flat", { x: 0.8, y: 9.3, z: 0.2 }, 26.6, 2, 2, 6),      // Ribs 1-7
    new Bone("False Ribs", "Flat", { x: 0.9, y: 8.5, z: 0.2 }, 22.0, 3, 2, 6),     // Ribs 8-10
    new Bone("Floating Ribs", "Flat", { x: 0.7, y: 7.9, z: 0.2 }, 18.2, 1, 2, 6),  // Ribs 11-12

    // Spine Bones - grouped and checked
    new Bone("Cervical Vertebrae", "Irregular", { x: 0, y: 10, z: 0 }, 2.5, 2, 2),
    new Bone("Thoracic Vertebrae", "Irregular", { x: 0, y: 8.5, z: 0 }, 3.0, 4, 2),
    new Bone("Lumbar Vertebrae", "Irregular", { x: 0, y: 6.2, z: 0 }, 3.5, 2, 2),

    // Hip bones -- checked
    new Bone("Ilium", "Flat", { x: 0.5, y: 4.7, z: 0 }, 20.0, 3, 2, 2),
    new Bone("Ischium", "Irregular", { x: 0.4, y: 4.4, z: -0.3 }, 10.0, 2, 2),
    new Bone("Pubis", "Irregular", { x: 0.4, y: 4.4, z: 0.3 }, 7.0, 3, 2, 1),
    new Bone("Sacrum", "Irregular", { x: 0, y: 4.4, z: -0.7 }, 11.0, 4, 2),
    new Bone("Coccyx", "Irregular", { x: 0, y: 4.0, z: -0.7 }, 4.0, 1, 2),

    //legs and feet -- checked
    new Bone("Femur", "Long", { x: 0, y: 4, z: 0 }, 45.72, 2, 0),
    new Bone("Patella", "Sesamoid", { x: 0, y: 2.5, z: 0 }, 4.5, 0, 0),
    new Bone("Tibia", "Long", { x: -0.5, y: 1.5, z: 0 }, 40.0, 2, 0),
    new Bone("Fibula", "Long", { x: 0.5, y: 1.5, z: 0 }, 40.0, 2, 0),
    new Bone("Talus", "Short", { x: 0, y: 0, z: 0 }, 5.0, 4, 0, 3),
    new Bone("Calcaneus", "Irregular", { x: 0, y: -0.3, z: 0 }, 5.5, 3, 0),
    new Bone("Navicular", "Short", { x: 0.2, y: -0.6, z: 0 }, 4.0, 6, 0, 3),
    new Bone("Cuboid", "Short", { x: 0.4, y: -0.8, z: 0 }, 4.0, 5, 0, 3),
    new Bone("Medial Cuneiform", "Short", { x: -0.2, y: -0.9, z: 0 }, 2.0, 4, 0, 7),
    new Bone("Intermediate Cuneiform", "Short", { x: 0, y: -0.9, z: 0 }, 2.0, 4, 0, 7),
    new Bone("Lateral Cuneiform", "Short", { x: 0.2, y: -0.9, z: 0 }, 2.0, 6, 0, 7),
    new Bone("Metatarsals", "Long", { x: 0, y: -1.2, z: 0 }, 5.0, 2, 0, 2),
    new Bone("Foot Phalanges", "Long", { x: 0, y: -1.5, z: 0 }, 2.5, 2, 0, 4),
];