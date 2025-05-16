"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Import all images
import ai1 from "@/assets/images/1 (2).jpg";
import orig2 from "@/assets/images/1 (3).jpg";
import ai2 from "@/assets/images/1 (4).jpg";
import orig3 from "@/assets/images/1 (5).jpg";
import ai3 from "@/assets/images/1 (6).jpg";
import ai4 from "@/assets/images/1 (8).jpg";
import Image from "next/image";

interface UseCaseCard {
  id: string;
  title: string;
  description: string;
  image: any;
}

const UseCases: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const useCases: UseCaseCard[] = [
    {
      id: "corporate",
      title: "Corporate Professionals",
      description:
        "Optimize your LinkedIn profile with a studio-grade picture. Align with platform standards to boost your professional visibility and network impact.",
      image: ai1,
    },
    {
      id: "legal",
      title: "Legal Professionals",
      description:
        "Project confidence and trustworthiness with a professional portrait. Perfect for firm websites, legal directories, and client communications.",
      image: orig2,
    },
    {
      id: "realestate",
      title: "Real Estate Agents",
      description:
        "Build trust with clients through a polished, approachable headshot. Stand out in a competitive market and make a memorable first impression.",
      image: ai2,
    },
    {
      id: "freelancers",
      title: "Freelancers & Consultants",
      description:
        "Create a personal brand with professional headshots that reflect your expertise. Enhance your portfolio and attract high-value clients.",
      image: orig3,
    },
    {
      id: "academics",
      title: "Academics & Educators",
      description:
        "Present yourself professionally for academic profiles, institution websites, conference materials, and professional publications.",
      image: ai3,
    },
    {
      id: "jobseekers",
      title: "Job Seekers",
      description:
        "Increase your interview chances with an impressive profile picture. Stand out in resume submissions and create a positive first impression.",
      image: ai4,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            First{" "}
            <span className="bg-gradient-to-r from-corporate-blue to-corporate-green bg-clip-text text-transparent">
              impression
            </span>{" "}
            is the best impression
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Used by individuals, small teams and professional photographers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {useCases.map((item, idx) => (
              <div
                key={item.id}
                className="relative group p-2 w-full h-full"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated background that moves between cards */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      className="absolute inset-0 -m-2 rounded-2xl bg-[#0A66C2]/5"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white group-hover:shadow-xl transition-all duration-300">
                  {/* Card image with 4:3 aspect ratio (height is 4, width is 3) */}
                  <div className="relative w-full pt-[133.33%] overflow-hidden">
                    {/* 4:3 aspect ratio where height is 4 and width is 3 (4/3 = 1.3333 = 133.33%) */}
                    <Image
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
                        hoveredIndex === idx
                          ? "text-[#0A66C2]"
                          : "text-gray-900"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <a
                      href={`learn-more?id=${item.id}`}
                      className="inline-flex items-center text-[#0A66C2] hover:text-[#0A66C2]/80 font-medium text-sm"
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
                          hoveredIndex === idx
                            ? "translate-x-2"
                            : "translate-x-0"
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
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 rounded-xl border-2 border-[#0A66C2] pointer-events-none z-20"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
