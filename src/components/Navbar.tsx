// src/components/Navbar.tsx
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div
          className="
            flex items-center 
            justify-between      /* mobile: logo left, button right */
            md:justify-center    /* desktop: center all three */
            md:space-x-[10.5rem]  /* desktop: 9.5rem gap */
          "
        >
          {/* Award badge: hidden on small, visible md+ */}
          <div className="hidden md:block rounded-full bg-blue-50 px-3 py-1.5">
            <div className="flex items-center justify-center text-blue-600 text-xs font-medium">
              <svg
                className="w-3 h-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <a
                href="/about-founder"
                className="mx-1 font-semibold whitespace-nowrap hover:text-blue-700 transition-colors"
              >
                Made by a Photographer
              </a>
              <svg
                className="w-3 h-3 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          {/* Logo: always visible, centered on md+ */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 whitespace-nowrap ml-0 md:-ml-8"
          >
            <span role="img" aria-label="camera">
              🎥
            </span>
            <span>Make Headshot</span>
          </Link>

          {/* CTA Button */}
          <Link
            href="/user"
            className="
              rounded-lg 
              bg-gradient-to-r from-blue-600 to-emerald-500
              px-4 py-1 
              text-white text-sm font-semibold 
              hover:opacity-90 transition 
              whitespace-nowrap
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
