// File: src/constants/backdropOptions.ts

export interface BackdropOption {
  id: string;
  label: string;
  src: string;
}

export const backdropOptions: BackdropOption[] = [
  {
    id: "office",
    label: "Office",
    src: "/images/backdrops/office.png",
  },
  {
    id: "park_at_sunset",
    label: "Park at Sunset",
    src: "/images/backdrops/park.png",
  },
  {
    id: "window",
    label: "Window",
    src: "/images/backdrops/window.png",
  },
  {
    id: "cafe",
    label: "Cafe",
    src: "/images/backdrops/cafe.png",
  },
  // …add more as you go
];
