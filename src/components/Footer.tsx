import type React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">HeadshotsAI</h3>
            <p className="mb-4 text-gray-400">
              Professional AI-generated headshots in minutes. Elevate your online presence with our cutting-edge AI technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.235.605 1.79 1.16.556.554.91 1.122 1.161 1.79.247.637.415 1.363.465 2.428.048 1.023.061 1.379.061 3.808 0 2.43-.013 2.784-.06 3.808-.05 1.064-.218 1.791-.466 2.427a4.902 4.902 0 01-1.16 1.79c-.554.556-1.122.91-1.79 1.161-.636.247-1.363.415-2.427.465-1.024.048-1.379.061-3.808.061-2.43 0-2.784-.013-3.808-.06-1.064-.05-1.791-.218-2.428-.466a4.902 4.902 0 01-1.79-1.16c-.556-.554-.91-1.122-1.16-1.79-.247-.636-.416-1.363-.465-2.427-.048-1.024-.061-1.379-.061-3.808 0-2.43.013-2.784.06-3.808.05-1.064.218-1.791.466-2.428a4.902 4.902 0 011.16-1.79c.554-.556 1.122-.91 1.79-1.16.637-.247 1.363-.416 2.427-.465 1.024-.048 1.379-.06 3.808-.06zm0 2.475a1.24 1.24 0 00-1.238 1.238 1.24 1.24 0 001.238 1.238 1.24 1.24 0 001.238-1.238A1.24 1.24 0 0012.315 4.475zm0 8.203c-1.177 0-2.133-.957-2.133-2.135 0-1.177.956-2.134 2.133-2.134 1.178 0 2.135.957 2.135 2.134 0 1.178-.957 2.135-2.135 2.135zm0-5.415c-1.804 0-3.27 1.466-3.27 3.27 0 1.805 1.466 3.27 3.27 3.27 1.805 0 3.27-1.465 3.27-3.27 0-1.804-1.465-3.27-3.27-3.27z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white">Features</a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">API Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Subscribe</h3>
            <p className="mb-4 text-gray-400">
              Subscribe to our newsletter to get updates on new features and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} HeadshotsAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
