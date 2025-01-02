import { Part } from '../types';

export const parts: Part[] = [
  {
    id: "TSN505A",
    name: "Standard Seal",
    type: "seal",
    compatibleHousings: ["SNL505"],
    description: "Standard labyrinth seal for SNL housing",
    imageUrl: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&q=80&w=400&h=300" // Metal seal/bearing image
  },
  {
    id: "TSN505L",
    name: "Extended Seal",
    type: "seal",
    compatibleHousings: ["SNL505"],
    description: "Extended labyrinth seal for contaminated environments",
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400&h=300" // Industrial machinery close-up
  },
  {
    id: "FRB-5/12",
    name: "Fixed Ring Bearing",
    type: "ring",
    compatibleHousings: ["SNL505", "SNA506-607"],
    description: "Fixed ring bearing for shaft alignment",
    imageUrl: "https://images.unsplash.com/photo-1591609094532-5f9f41f79bba?auto=format&fit=crop&q=80&w=400&h=300" // Close-up of metal bearing
  },
  {
    id: "LN-5",
    name: "Lock Nut",
    type: "locknut",
    compatibleHousings: ["SNL505", "SNA506-607"],
    description: "Precision lock nut for bearing mounting",
    imageUrl: "https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&q=80&w=400&h=300" // Industrial nuts and bolts
  },
  {
    id: "WS-5",
    name: "Wave Spring",
    type: "spring",
    compatibleHousings: ["SNL505"],
    description: "Wave spring for axial preload",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400&h=300" // Metal spring/coil
  }
];