"use client";
import React, { useEffect, useState } from "react";
const TermsOfService = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#eaf0ff] to-white">
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-cover opacity-10 pointer-events-none"></div>

        <main
          className={`max-w-5xl mx-auto px-6 py-16 transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-10 md:p-14 border border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-sm text-center text-gray-600 mb-10">
              Last updated: May 27, 2025
            </p>

            {sections.map(({ title, content }, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {title}
                </h2>
                {Array.isArray(content) ? (
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{content}</p>
                )}
              </section>
            ))}

            <section className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Contact
              </h2>
              <p className="text-gray-700">
                If you have any questions, please contact us at{" "}
                <a
                  href="mailto:support@makeheadshot.com"
                  className="text-blue-600 underline"
                >
                  support@makeheadshot.com
                </a>
                .
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Make Headshot, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use our services.",
  },
  {
    title: "2. Eligibility",
    content:
      "You must be at least 13 years old to use our services. By using Make Headshot, you confirm that you meet this requirement.",
  },
  {
    title: "3. User Responsibilities",
    content: [
      "Do not upload unlawful or harmful content.",
      "Do not attempt unauthorized access to our systems.",
      "Do not interfere with platform functionality.",
    ],
  },
  {
    title: "4. Account Security",
    content:
      "You are responsible for safeguarding your account. We are not liable for any unauthorized use of your credentials.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content, trademarks, and code are owned by Make Headshot or its licensors. Unauthorized reproduction is prohibited.",
  },
  {
    title: "6. User Content",
    content:
      "By uploading content, you grant us a license to use it for providing and improving our services. You retain ownership.",
  },
  {
    title: "7. Payment and Billing",
    content:
      "Some features require payment. You authorize us to charge fees as applicable. All sales are final unless stated.",
  },
  {
    title: "8. Termination",
    content:
      "We may suspend or terminate your account for violation of terms. You may also deactivate your account anytime.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "We are not liable for indirect or consequential damages arising from your use of the service.",
  },
  {
    title: "10. Modifications",
    content:
      "We may update these Terms at any time. Your continued use indicates acceptance of the changes.",
  },
  {
    title: "11. Governing Law",
    content:
      "These terms are governed by Indian law. Disputes are subject to the jurisdiction of courts in New Delhi.",
  },
];

export default TermsOfService;
