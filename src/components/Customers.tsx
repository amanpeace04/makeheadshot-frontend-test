// src/components/Customers.tsx
"use client";
import React from "react";

// Relative import of your cn utility
import { cn } from "../lib/utils";

// Import all 8 images from assets/images:
import orig1 from "@/assets/images/1 (1).jpg";
import ai1 from "@/assets/images/1 (2).jpg";
import orig2 from "@/assets/images/1 (3).jpg";
import ai2 from "@/assets/images/1 (4).jpg";
import orig3 from "@/assets/images/1 (5).jpg";
import ai3 from "@/assets/images/1 (6).jpg";
import orig4 from "@/assets/images/1 (7).jpg";
import ai4 from "@/assets/images/1 (8).jpg";
import Image from "next/image";

// Build six boxes by taking your four unique pairs,
// then re-using the first two so we have exactly six:
const sets = [
  {
    title: "Professional Style",
    subtitle: "Executive Package",
    ai: ai1,
    orig: orig1,
  },
  {
    title: "Executive Style",
    subtitle: "Executive Package",
    ai: ai2,
    orig: orig2,
  },
  {
    title: "Modern Style",
    subtitle: "Executive Package",
    ai: ai3,
    orig: orig3,
  },
  {
    title: "Creative Style",
    subtitle: "Executive Package",
    ai: ai4,
    orig: orig4,
  },
  {
    title: "Professional Style",
    subtitle: "Executive Package",
    ai: ai1,
    orig: orig1,
  }, // repeat
  {
    title: "Executive Style",
    subtitle: "Executive Package",
    ai: ai2,
    orig: orig2,
  }, // repeat
];

const Customers: React.FC = () => (
  <section className="py-16 bg-white">
    {/* Header */}
    <div className="container mx-auto px-4 text-center mb-12">
      <h1 className="text-4xl sm:text-4xl font-bold mb-2">
        See{" "}
        <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          AI magic
        </span>{" "}
        in action
      </h1>
      <p className="text-gray-600">
        Turn your selfies into professional headshots in seconds
      </p>
    </div>

    {/* Grid: 3 columns, automatically wraps to 2 rows */}
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {sets.map((s, i) => (
        <div
          key={i}
          className="group relative rounded-xl overflow-hidden shadow-lg"
        >
          {/* “Hover to see original” badge */}
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
            Hover to see original
          </div>

          {/* AI-generated shot (default) */}
          <Image
            src={s.ai}
            alt={`${s.title} (AI headshot)`}
            className="w-full object-cover"
            style={{ aspectRatio: "2 / 3" }}
          />

          {/* Original selfie, fades in on hover */}
          <Image
            src={s.orig}
            alt={`${s.title} (original selfie)`}
            className={cn(
              "absolute inset-0 w-full object-cover",
              "opacity-0 transition-opacity duration-500",
              "group-hover:opacity-100"
            )}
            style={{ aspectRatio: "2 / 3" }}
          />

          {/* Title area */}
          <div className="p-4 bg-white">
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Customers;
