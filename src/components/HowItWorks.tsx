import React from "react";

// Import images (keeping the original imports)
import img1 from "@/assets/images/1 (1).jpg";
import img2 from "@/assets/images/1 (2).jpg";
import img3 from "@/assets/images/1 (3).jpg";
import img4 from "@/assets/images/1 (4).jpg";
import img5 from "@/assets/images/1 (5).jpg";
import img6 from "@/assets/images/1 (6).jpg";
import img7 from "@/assets/images/1 (7).jpg";
import img8 from "@/assets/images/1 (8).jpg";

// SVG imports
import UploadIcon from "@/assets/svg/upload.svg";
import SelectIcon from "@/assets/svg/select.svg";
import DownloadIcon from "@/assets/svg/download.svg";
import Image from "next/image";

// For consistent height, we'll use all 6 steps across components
const steps = [
  {
    icon: UploadIcon,
    number: "1",
    title: "Upload your selfies",
    description:
      "Share a few recent photos. Our AI analyzes them to capture your most photogenic qualities and unique style—usually takes 1–2 minutes.",
    images: [img1, img2, img3, img4, img5, img6],
  },
  {
    icon: SelectIcon,
    number: "2",
    title: "Select backgrounds & styles",
    description:
      "Choose from a variety of backgrounds and styles to match your personal brand—tailor your look in just seconds.",
    images: [img4, img5, img6, img7, img8, img1],
  },
  {
    icon: DownloadIcon,
    number: "3",
    title: "Download headshots",
    description:
      "In minutes, get 100+ studio-quality headshots in various styles. No photographer or studio visit needed—it's that simple!",
    images: [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img1,
      img2,
      img3,
      img4,
    ],
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-center text-4xl font-bold mb-2">
            Create{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              headshots
            </span>{" "}
            in three simple steps
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Get your professional headshots in minutes, not days.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-0">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-lg flex flex-col h-full"
            >
              {/* Icon and number */}
              <div className="flex items-center gap-6 mb-6">
                <Image
                  src={step.icon}
                  alt={`Step ${step.number} icon`}
                  className="w-20 h-20 object-contain flex-shrink-0"
                  priority
                />
                <div className="flex flex-col">
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent text-4xl font-extrabold leading-none mb-1">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-bold leading-snug max-w-xs">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 flex-grow leading-relaxed">
                {step.description}
              </p>

              {/* Images with indicators */}
              <div className="mt-auto">
                {idx === 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {step.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                      >
                        <Image
                          src={img}
                          alt={`${step.title} example ${i + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                          priority={i < 3}
                        />
                        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {idx === 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {step.images.map((img, i) => (
                      <div
                        key={i}
                        className={`relative aspect-square rounded-lg overflow-hidden shadow-sm ${
                          i < 3 ? "ring-2 ring-blue-600" : ""
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Style option ${i + 1}`}
                          className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                            i >= 3 ? "opacity-80" : ""
                          }`}
                          priority={i < 3}
                        />
                        {i < 3 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {idx === 2 && (
                  <div className="grid grid-cols-4 gap-3">
                    {step.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                      >
                        <Image
                          src={img}
                          alt={`Final headshot ${i + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                          priority={i < 4}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
