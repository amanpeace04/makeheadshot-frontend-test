"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const HelpCenter = () => {
  const [showContent, setShowContent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.info("Submission is not functional yet.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#eef0f3] via-[#e4e8f7] to-[#e0e6f8]">
      <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-cover opacity-20 pointer-events-none" />

      <main
        className={`max-w-4xl mx-auto px-6 py-16 transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 md:p-14 border border-gray-300">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Help Center
          </h1>
          <p className="text-center text-gray-700 mb-10">
            Have a question or concern? Fill out the form below and our team
            will get back to you shortly.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-2">Your Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Thank you!
              </h2>
              <p className="text-gray-800">
                We've received your message and will get back to you soon.
              </p>
            </div>
          )}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default HelpCenter;
