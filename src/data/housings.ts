import { Housing } from '../types';

export const housings: Housing[] = [
  {
    id: "SNL505",
    name: "SNL Split Plummer Block Housing",
    compatibleBearings: ["6205-2Z", "6206-RS"],
    description: "Split plummer block housing for medium duty applications",
    specifications: {
      material: "Cast Iron",
      mounting: "Foot Mounted",
      sealType: "Labyrinth"
    }
  },
  {
    id: "SNA506-607",
    name: "SNA Plummer Block Housing",
    compatibleBearings: ["6206-RS", "6304-C3"],
    description: "Heavy duty plummer block housing",
    specifications: {
      material: "Cast Iron",
      mounting: "Foot Mounted",
      sealType: "Double Lip"
    }
  }
];