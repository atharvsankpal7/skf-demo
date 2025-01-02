// Previous data remains, adding more parts
export const parts: Part[] = [
  {
    id: "TSN505A",
    name: "Standard Seal",
    type: "seal",
    compatibleHousings: ["SNL505"],
    description: "Standard labyrinth seal for SNL housing",
    imageUrl: "https://images.unsplash.com/photo-1612690669207-fed642192c40?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "TSN505L",
    name: "Extended Seal",
    type: "seal",
    compatibleHousings: ["SNL505"],
    description: "Extended labyrinth seal for contaminated environments",
    imageUrl: "https://images.unsplash.com/photo-1612690669207-fed642192c40?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "FRB-5/12",
    name: "Fixed Ring Bearing",
    type: "ring",
    compatibleHousings: ["SNL505", "SNA506-607"],
    description: "Fixed ring bearing for shaft alignment",
    imageUrl: "https://images.unsplash.com/photo-1585792180666-f7347c490ee9?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "LN-5",
    name: "Lock Nut",
    type: "locknut",
    compatibleHousings: ["SNL505", "SNA506-607"],
    description: "Precision lock nut for bearing mounting",
    imageUrl: "https://images.unsplash.com/photo-1589739900266-5c1f8be31969?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "WS-5",
    name: "Wave Spring",
    type: "spring",
    compatibleHousings: ["SNL505"],
    description: "Wave spring for axial preload",
    imageUrl: "https://images.unsplash.com/photo-1585792180666-f7347c490ee9?auto=format&fit=crop&q=80&w=400"
  }
];