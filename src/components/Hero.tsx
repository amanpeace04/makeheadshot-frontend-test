import React from "react";
import { Spotlight } from "./ui/home/spotlight-new";
import { FlipWords } from "./ui/home/flip-words";

const Hero: React.FC = () => {
  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
    "https://i.pravatar.cc/100?img=5",
  ];

  const professions = [
    "Lawyers",
    "Doctors",
    "Teachers",
    "Engineers",
    "Designers",
    "Students",
    "Free-lancers",
    "Entrepreneurs",
    "Developers",
    "Business owners",
    "Artists",
    "Everyone",
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Spotlight background */}
      <Spotlight
        translateY={-200}
        width={600}
        height={1000}
        smallWidth={250}
        duration={8}
        xOffset={150}
        gradientFirst="radial-gradient(70% 70% at 30% 30%, rgba(10,102,194,0.1) 0%, transparent 90%)"
        gradientSecond="radial-gradient(60% 60% at 70% 50%, rgba(255,107,53,0.08) 0%, transparent 90%)"
        gradientThird="radial-gradient(50% 50% at 50% 70%, rgba(0,168,118,0.05) 0%, transparent 90%)"
      />

      {/* Foreground content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <span className="inline-block mb-6 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 font-poppins">
          Headshots for{" "}
          <FlipWords words={professions} duration={1500} highlighted={true} />
        </span>

        <h1 className="mb-10 text-5xl font-extrabold text-gray-900 sm:text-6xl font-poppins">
          <span className="block mb-5">Make Professional</span>

          <span className="relative inline-block mb-5">
            <span className="relative z-10 text-white">Headshots</span>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500"></span>
          </span>

          <span className="block">in minutes</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 font-manrope">
          Turn your selfies into professional headshots with AI.
          <br />
          Upload photos &rarr; Pick your style &rarr; Get headshots.
          <br />
        </p>

        {/* CTA with moving hover-border halo */}
        <a
          href="/get-started"
          className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-3 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins whitespace-nowrap"
        >
          Make HeadShots →
        </a>

        {/* Avatars */}
        <div className="mt-10 flex justify-center -space-x-2">
          {avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`User ${i + 1}`}
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
            />
          ))}
        </div>

        {/* Recommendation text */}
        <p className="mt-4 text-sm text-gray-700 font-manrope">
          <strong className="text-gray-900">
            92% of customers recommend us
          </strong>
          <br />
          Trusted by 100+ satisfied customers
        </p>
      </div>
    </div>
  );
};

export default Hero;
