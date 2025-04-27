// src/utils/image-utils.ts

// Import slider images dynamically
import img1 from "@/assets/slider_images/1.jpg";
import img2 from "@/assets/slider_images/2.jpg";
import img3 from "@/assets/slider_images/3.jpg";
import img4 from "@/assets/slider_images/4.jpg";
import img5 from "@/assets/slider_images/5.jpg";

// Corresponding "real" images
import img1Real from "@/assets/slider_images/1_real.jpg";
import img2Real from "@/assets/slider_images/2_real.jpg";
import img3Real from "@/assets/slider_images/3_real.jpg";
import img4Real from "@/assets/slider_images/4_real.jpg";
import img5Real from "@/assets/slider_images/5_real.jpg";

export interface ImagePair {
  main: string;
  real: string;
}

// Export the image pairs array for use in components
export const imagePairs: ImagePair[] = [
  { main: img1, real: img1Real },
  { main: img2, real: img2Real },
  { main: img3, real: img3Real },
  { main: img4, real: img4Real },
  { main: img5, real: img5Real },
];

// Helper function to get a random image pair
export const getRandomImagePair = (): ImagePair => {
  const randomIndex = Math.floor(Math.random() * imagePairs.length);
  return imagePairs[randomIndex];
};

// Helper function to get multiple random image pairs (without duplicates)
export const getRandomImagePairs = (count: number): ImagePair[] => {
  const shuffled = [...imagePairs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
