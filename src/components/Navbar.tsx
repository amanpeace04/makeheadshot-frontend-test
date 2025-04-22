import type React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-gray-900">
            Headshots AI
          </a>
        </div>
        <div className="hidden md:flex">
          <a href="#features" className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Features
          </a>
          <a href="#examples" className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Examples
          </a>
          <a href="#pricing" className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Pricing
          </a>
          <a href="#faq" className="px-4 py-2 text-gray-600 hover:text-gray-900">
            FAQ
          </a>
        </div>
        <div className="flex items-center">
          <a href="/login" className="mr-4 text-gray-600 hover:text-gray-900">
            Login / Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
