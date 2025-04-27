import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Import images directly
import ai1 from "../../assets/images/1 (2).jpg";
import orig2 from "../../assets/images/1 (3).jpg";
import ai2 from "../../assets/images/1 (4).jpg";
import orig3 from "../../assets/images/1 (5).jpg";
import ai3 from "../../assets/images/1 (6).jpg";
import ai4 from "../../assets/images/1 (8).jpg";

interface Card {
  id: string;
  title: string;
  description: string;
  image: any; // Using any type to accept imported images
}

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: Card[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="group relative block w-full p-2 h-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white group-hover:shadow-xl transition-all duration-300">
            {/* Card image with 4:3 aspect ratio */}
            <div className="relative w-full pt-[75%] overflow-hidden">
              {" "}
              {/* 4:3 aspect ratio (3/4 = 0.75 = 75%) */}
              <img
                src={item.image}
                alt={item.title}
                className={cn(
                  "absolute top-0 left-0 w-full h-full object-cover object-center transition-all duration-700 ease-out",
                  hoveredIndex === idx ? "scale-110" : "scale-100"
                )}
              />
              {/* Gradient overlay on hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300",
                  hoveredIndex === idx ? "opacity-100" : "opacity-0"
                )}
              />
            </div>

            {/* Card content */}
            <div className="p-5">
              <h3
                className={cn(
                  "text-xl font-semibold mb-2 transition-colors duration-300",
                  hoveredIndex === idx ? "text-[#0A66C2]" : "text-gray-900"
                )}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {item.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center text-[#0A66C2] font-medium text-sm"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={cn(
                    "w-4 h-4 ml-1 transition-transform duration-300",
                    hoveredIndex === idx ? "translate-x-2" : "translate-x-0"
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Highlight border effect on hover */}
          {hoveredIndex === idx && (
            <div className="absolute inset-0 rounded-xl border-2 border-[#0A66C2] pointer-events-none" />
          )}

          {/* Glow effect */}
          {hoveredIndex === idx && (
            <div className="absolute inset-0 -z-10 rounded-xl bg-[#0A66C2]/10 blur-xl" />
          )}
        </div>
      ))}
    </div>
  );
};
