import React from "react";
import { ThreeDMarquee } from "@/components/ui/home/ThreeDMarquee";

// Import your images or use placeholders
import img1 from "@/assets/images/1 (1).jpg";
import img2 from "@/assets/images/1 (2).jpg";
import img3 from "@/assets/images/1 (3).jpg";
import img4 from "@/assets/images/1 (4).jpg";
import img5 from "@/assets/images/1 (5).jpg";
import img6 from "@/assets/images/1 (6).jpg";
import img7 from "@/assets/images/1 (7).jpg";
import img8 from "@/assets/images/1 (8).jpg";

// Create a larger array of images by repeating them
const createImageArray = (): string[] => {
  const baseImages: string[] = [img1, img2, img3, img4, img5, img6, img7, img8];
  let images: string[] = [];
  // Repeat the base images 5 times to get 40 images
  for (let i = 0; i < 5; i++) {
    images = [...images, ...baseImages];
  }
  return images;
};

const CTASection: React.FC = () => {
  return (
    <section className="relative mx-auto my-12 w-[90%] md:w-[80%] lg:w-[70%] h-[400px] overflow-hidden rounded-2xl bg-[#111111]">
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/80" />

      {/* 3D Marquee positioned as the background */}
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={createImageArray()}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Make your HeadShots quickly with AI
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Get professional headshots in minutes without the hassle of a
          traditional photoshoot.
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-3 rounded-lg bg-white text-white font-semibold transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            Get Started
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
