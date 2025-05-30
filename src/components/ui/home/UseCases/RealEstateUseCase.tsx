"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import ai1 from "@/assets/images/1 (8).jpg";
import orig2 from "@/assets/images/1 (4).jpg";
import ai2 from "@/assets/images/1 (6).jpg";
import orig3 from "@/assets/images/1 (5).jpg";
import ai3 from "@/assets/images/1 (3).jpg";
import ai4 from "@/assets/images/1 (2).jpg";

export default function RealEstateUseCase() {
  return (
    <div className="bg-white text-gray-900 leading-relaxed tracking-wide">
      {/* Hero */}
      <section className="px-6 py-24 md:px-16 lg:px-32 text-center bg-gradient-to-r from-blue-50 to-green-50">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          AI Headshots for Real Estate Professionals
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 mb-8">
          Showcase your professionalism and approachability with polished
          portraits perfect for listings, websites, and client engagement.
        </p>
        <Link href="/user">
          <button className="bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-blue-800 transition duration-300">
            Generate Your Real Estate Headshot
          </button>
        </Link>
      </section>

      {/* Example Headshots */}
      <section className="bg-gray-100 px-6 py-20 md:px-16 lg:px-32 text-center">
        <h2 className="text-3xl font-bold mb-10">Trusted Agent Portraits</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { ai: ai2, orig: orig3 },
            { ai: ai4, orig: orig2 },
            { ai: ai1, orig: orig3 },
            { ai: ai3, orig: orig2 },
          ].map((img, i) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden shadow-md"
            >
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10 pointer-events-none">
                Hover to see original
              </div>

              <Image
                src={img.ai}
                alt={`AI Real Estate Headshot ${i + 1}`}
                className="w-full object-cover transition-opacity duration-500"
                style={{ aspectRatio: "2 / 3" }}
              />
              <Image
                src={img.orig}
                alt={`Original Real Estate Photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ aspectRatio: "2 / 3" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-20 md:px-16 lg:px-32 space-y-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Build Client Trust Instantly</h2>
            <p className="text-gray-600 text-lg">
              Create a warm, approachable image that attracts potential buyers
              and sellers with AI-generated professional portraits.
            </p>
          </div>
          <Image
            src={ai3}
            alt="Real estate professional headshot"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src={orig2}
            alt="Real estate agent team"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Consistent Branding for Your Agency
            </h2>
            <p className="text-gray-600 text-lg">
              Ensure all agents and staff have cohesive professional images that
              reinforce your agency’s brand and reputation.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 md:px-16 lg:px-32 text-center bg-gradient-to-br from-white via-corporate-blue/5 to-corporate-green/5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Elevate Your Real Estate Brand with Professional Portraits
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Stand out in a competitive market with AI-generated headshots that
          showcase professionalism and approachability.
        </p>
        <Link href="/user">
          <button className="bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-blue-800 transition duration-300">
            Get Started Now
          </button>
        </Link>
      </section>
    </div>
  );
}
