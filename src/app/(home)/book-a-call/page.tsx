"use client";

import React from "react";

export default function BookCall() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Book a Free Consultation Call
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Choose a time that works best for you. We'll meet on Google Meet.
        </p>
        <div className="w-full h-[75vh] rounded-xl overflow-hidden border border-gray-300 shadow-md">
          <iframe
            src="https://calendly.com/makeheadshotcom/open-discussion"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full"
            allow="camera; microphone; fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
