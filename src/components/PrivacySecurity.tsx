import React from 'react';

const PrivacySecurity: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-corporate-dark">
          Enterprise-grade security for{" "}
          <span className="bg-gradient-to-r from-corporate-blue to-corporate-green bg-clip-text text-transparent">
            your
          </span>{" "}
          data
        </h2>
        <p className="text-center text-corporate-medium mb-2 max-w-3xl mx-auto">
          At HeadshotsAI, security isn&apos;t an afterthought - it&apos;s built
          into everything we do.
        </p>
        <p className="text-center text-corporate-medium mb-12 max-w-3xl mx-auto">
          Your data is protected with bank-level security on AWS infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left box */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-corporate-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-corporate-dark">
                You&apos;re in complete control
              </h3>
            </div>
            <p className="text-corporate-medium mb-6">
              As a paid product, we have a clear business model: you&apos;re our
              customer, not our product. We never sell your data or use your
              photos to train AI models.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="min-w-5 h-5 mr-3">
                  <svg
                    className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-corporate-medium">
                  30-day data retention policy
                </span>
              </div>
              <div className="flex items-center">
                <div className="min-w-5 h-5 mr-3">
                  <svg
                    className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-corporate-medium">
                  Automatic data deletion
                </span>
              </div>
              <div className="flex items-center">
                <div className="min-w-5 h-5 mr-3">
                  <svg
                    className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-corporate-medium">
                  Delete your data anytime
                </span>
              </div>
            </div>
            <a
              href="/privacy-policy"
              className="inline-flex items-center text-corporate-blue font-medium hover:text-corporate-green transition-colors"
            >
              Privacy Policy
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

          {/* Right box */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-corporate-dark">
                Enterprise-ready security
              </h3>
            </div>
            <p className="text-corporate-medium mb-6">
              We host all our services on AWS, using industry-standard security
              protocols to ensure your data remains private and protected at all
              times.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="min-w-5 h-5 mr-3">
                  <svg
                    className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-corporate-medium">
                  AWS cloud infrastructure
                </span>
              </div>
              <div className="flex items-center">
                <div className="min-w-5 h-5 mr-3">
                  <svg
                    className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-corporate-medium">
                  Encrypted data storage
                </span>
              </div>
              <div className="flex items-center">
                <div className="min-w-5 h-5 mr-3">
                  <svg
                    className="w-5 h-5 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-corporate-medium">
                  Secure data transmission
                </span>
              </div>
            </div>
            <a
              href="/terms-of-service"
              className="inline-flex items-center text-corporate-blue font-medium hover:text-corporate-green transition-colors"
            >
              Terms of Service
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
        </div>
      </div>
    </section>
  );
};

export default PrivacySecurity;