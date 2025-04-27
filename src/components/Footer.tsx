import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
          {/* Company info - spans 3 columns */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              HeadshotsAI
            </h3>
            <p className="text-gray-600 mb-4">
              Professional AI-generated headshots in minutes.
              <br />
              Elevate your online presence with our cutting-edge AI technology.
            </p>
          </div>

          {/* Empty column for spacing */}
          <div className="hidden md:block"></div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#help" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2025 HeadshotsAI. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a href="#" aria-label="Twitter">
                <svg
                  className="h-5 w-5 text-gray-500 hover:text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  className="h-5 w-5 text-gray-500 hover:text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C9.284 2 8.944 2.01 7.877 2.06c-1.064.05-1.79.217-2.428.465a4.883 4.883 0 00-1.77 1.151 4.882 4.882 0 00-1.151 1.77c-.248.637-.416 1.364-.465 2.428C2.01 8.944 2 9.284 2 12s.01 3.057.06 4.123c.05 1.064.217 1.79.465 2.428a4.88 4.88 0 001.15 1.77c.555.555 1.133.976 1.77 1.151.638.248 1.365.416 2.429.465 1.067.05 1.407.06 4.123.06s3.057-.01 4.123-.06c1.064-.05 1.79-.217 2.428-.465a4.882 4.882 0 001.77-1.15c.556-.556.976-1.134 1.151-1.77.248-.638.416-1.365.465-2.429.05-1.066.06-1.407.06-4.123s-.01-3.056-.06-4.123c-.05-1.064-.217-1.79-.465-2.428a4.886 4.886 0 00-1.151-1.77 4.886 4.886 0 00-1.77-1.151c-.637-.248-1.364-.416-2.428-.465C15.056 2.01 14.716 2 12 2zm0 1.8c2.67 0 2.986.01 4.04.058.976.045 1.505.208 1.858.344.466.182.8.399 1.15.748.35.35.566.684.748 1.15.136.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.208 1.505-.344 1.858a3.09 3.09 0 01-.748 1.15c-.35.35-.684.566-1.15.748-.353.136-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.208-1.858-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.136-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.208-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.136.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058zm0 3.064A5.136 5.136 0 006.864 12 5.136 5.136 0 0012 17.136 5.136 5.136 0 0017.136 12 5.136 5.136 0 0012 6.864zm0 8.468A3.333 3.333 0 018.667 12 3.333 3.333 0 0112 8.667 3.333 3.333 0 0115.333 12 3.333 3.333 0 0112 15.332zM17.338 6.595a1.198 1.198 0 11-2.397 0 1.198 1.198 0 012.397 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg
                  className="h-5 w-5 text-gray-500 hover:text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
