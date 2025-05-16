import React from "react";

// Custom Background Gradient component
const BackgroundGradient = ({
  children,
  className,
  colorScheme = "blue",
}: {
  children?: React.ReactNode;
  className?: string;
  colorScheme?: "blue" | "red";
}) => {
  // Different gradients based on color scheme
  const gradientClasses = {
    blue: "bg-gradient-to-r from-corporate-blue to-corporate-green",
    red: "bg-gradient-to-r from-corporate-red to-[#F27781]",
  };

  return (
    <div className={`relative p-[1px] group ${className || ""}`}>
      {/* Blurred background for glow effect */}
      <div
        className={`absolute inset-0 rounded-lg z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 animate-gradient-background ${gradientClasses[colorScheme]}`}
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Sharp background */}
      <div
        className={`absolute inset-0 rounded-lg z-[1] animate-gradient-background ${gradientClasses[colorScheme]}`}
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default function Comparison() {
  const quickPoints = [
    "Upload your selfies anywhere, anytime",
    "AI processes in 1–2 minutes",
    "Pick your favorite 100+ headshots",
    "Full commercial usage rights",
    "Studio-quality results",
    "No scheduling or travel",
    "Multiple styles & backgrounds",
    "100% privacy—photos deleted after 30 days",
  ];

  const traditionalPoints = [
    "Spend hours searching for photographers",
    "Reach out and wait for them to reply",
    "Struggle to find a time that works",
    "Pay a lot of money for the photoshoot",
    "Travel to the photographer's studio",
    "Sit through a long awkward photoshoot",
    "Wait days for the delivery of your edited photos",
    "Limited to one style and background",
  ];

  return (
    <section id="features" className="py-16 bg-corporate-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-corporate-dark">
          Why{" "}
          <span className="bg-gradient-to-r from-corporate-blue to-corporate-green bg-clip-text text-transparent">
            Make HeadShots
          </span>{" "}
          using AI?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/*  Headshots with AI*/}
          <BackgroundGradient colorScheme="blue" className="w-full">
            <div className="bg-white rounded-lg p-6 h-full">
              <h3 className="flex items-center text-xl font-semibold mb-6 text-corporate-dark">
                <div className="w-6 h-6 rounded-full bg-corporate-blue text-white flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                Headshots with AI
              </h3>
              <ul className="space-y-4">
                {quickPoints.map((pt, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-corporate-blue text-white flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-corporate-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BackgroundGradient>

          {/* Traditional Photoshoot */}
          <BackgroundGradient colorScheme="red" className="w-full">
            <div className="bg-white rounded-lg p-6 h-full">
              <h3 className="flex items-center text-xl font-semibold mb-6 text-corporate-dark">
                <div className="w-6 h-6 rounded-full bg-corporate-red text-white flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                Traditional Photoshoot
              </h3>
              <ul className="space-y-4">
                {traditionalPoints.map((pt, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-corporate-red text-white flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <span className="text-corporate-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </section>
  );
}
