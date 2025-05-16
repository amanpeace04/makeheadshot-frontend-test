import React from "react";
import { CardSpotlight } from "@/components/ui/home/CardSpotlight";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-corporate-dark">
          Simple,{" "}
          <span className="bg-gradient-to-r from-corporate-blue to-corporate-green bg-clip-text text-transparent">
            transaparent
          </span>{" "}
          pricing
        </h2>
        <p className="text-xl text-center text-corporate-medium mb-12 max-w-3xl mx-auto">
          The average cost of professional headshots is $500 in EU and the U.S.
          Our packages start at just ₹1,490 -{" "}
          <span className="font-semibold text-corporate-dark">10x cheaper</span>{" "}
          than traditional options.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <CardSpotlight className="rounded-2xl border-2 border-gray-200 bg-white shadow-sm h-full">
            <div className="p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-center text-corporate-dark mb-2">
                Basic
              </h3>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-corporate-dark">
                  ₹1,490
                </span>
                <span className="text-corporate-medium">/once</span>
              </div>
              <p className="text-center text-corporate-medium mb-6">
                Perfect for individuals who need professional headshots for
                their social media profiles.
              </p>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">50 headshots</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">5 backgrounds</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">5 outfits</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    Choose from 30 styles
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    Delivery within 4 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 text-gray-300 rounded-full p-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium text-gray-400">
                    No custom shoot credits
                  </span>
                </div>
              </div>
              <div className="mt-auto">
                <Link
                  href="/user"
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gradient-to-r hover:from-corporate-blue hover:to-corporate-green text-corporate-dark hover:text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get started
                </Link>
              </div>
            </div>
          </CardSpotlight>

          {/* Professional Plan */}
          <CardSpotlight className="rounded-2xl border-2 border-corporate-blue bg-white shadow-lg h-full relative z-10">
            {/* Dual tone gradient background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-corporate-blue/10 to-corporate-green/10 -z-10"></div>

            <div className="p-8 h-full flex flex-col relative">
              <h3 className="text-2xl font-bold text-center text-corporate-dark mb-2">
                Professional
              </h3>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-corporate-dark">
                  ₹2,490
                </span>
                <span className="text-corporate-medium">/once</span>
              </div>
              <p className="text-center text-corporate-medium mb-6">
                Perfect for professionals who need versatile headshots for
                different platforms.
              </p>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">100 headshots</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">10 backgrounds</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">10 outfits</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    Choose from 60 styles
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    Delivery within 3 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    10 custom shot credits
                  </span>
                </div>
              </div>
              <div className="mt-auto">
                <Link
                  href="/user"
                  className="w-full py-3 px-4 bg-gradient-to-r from-corporate-blue to-corporate-green text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Get started
                </Link>
              </div>
            </div>
          </CardSpotlight>

          {/* Executive Plan */}
          <CardSpotlight className="rounded-2xl border-2 border-gray-200 bg-white shadow-sm h-full">
            <div className="p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-center text-corporate-dark mb-2">
                Executive
              </h3>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-corporate-dark">
                  ₹4,890
                </span>
                <span className="text-corporate-medium">/once</span>
              </div>
              <p className="text-center text-corporate-medium mb-6">
                Perfect for executives and leaders who need premium quality
                headshots.
              </p>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">200 headshots</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">20 backgrounds</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">20 outfits</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    Choose from 100 styles
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    Delivery within 2 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-6 h-6 mr-3">
                    <svg
                      className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium">
                    20 custom shot credits
                  </span>
                </div>
              </div>
              <div className="mt-auto">
                <Link
                  href="/user"
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gradient-to-r hover:from-corporate-blue hover:to-corporate-green text-corporate-dark hover:text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get started
                </Link>
              </div>
            </div>
          </CardSpotlight>
        </div>

        {/* Enterprise Section */}
        <div className="mt-16 max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <h3 className="text-xl font-bold text-corporate-blue mb-2">
                Enterprise (Team Solutions)
              </h3>
              <p className="text-corporate-medium mb-4 text-sm">
                Need consistent headshots for your entire team? We offer custom
                solutions with volume discounts.
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center">
                  <div className="min-w-5 h-5 mr-2">
                    <svg
                      className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium text-sm">
                    50 headshots per member
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-5 h-5 mr-2">
                    <svg
                      className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium text-sm">
                    100+ backdrops & outfits
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-5 h-5 mr-2">
                    <svg
                      className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium text-sm">
                    Tailored to brand
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-5 h-5 mr-2">
                    <svg
                      className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-corporate-medium text-sm">
                    Bulk discounts available
                  </span>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-corporate-blue to-corporate-green text-white rounded-lg font-medium transform hover:-translate-y-1 transition duration-300 text-sm"
              >
                Book A Call
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            <div className="hidden md:block md:col-span-5">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-corporate-medium">5-50 users</span>
                    <span className="text-green-500 font-medium">10% OFF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-corporate-medium">50+ users</span>
                    <span className="text-green-500 font-medium">20% OFF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-corporate-medium">100+ users</span>
                    <span className="text-green-500 font-medium">25% OFF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-corporate-medium">250+ users</span>
                    <span className="text-green-500 font-medium">30% OFF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-corporate-medium">500+ users</span>
                    <span className="text-green-500 font-medium">40% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
