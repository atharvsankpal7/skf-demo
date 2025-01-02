export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Bearing {
  id: string;
  name: string;
  description: string;
  dimensions: {
    innerDiameter: number;
    outerDiameter: number;
    width: number;
  };
}

export interface Housing {
  id: string;
  name: string;
  compatibleBearings: string[];
  description: string;
  specifications: {
    material: string;
    mounting: string;
    sealType: string;
  };
}

export interface Part {
  id: string;
  name: string;
  type: string;
  compatibleHousings: string[];
  description: string;
  imageUrl: string;
}

export interface Configuration {
  id: string;
  userId: string;
  userName: string;
  name: string;
  createdAt: string;
  bearing: Bearing;
  housing: Housing;
  parts: Part[];
}