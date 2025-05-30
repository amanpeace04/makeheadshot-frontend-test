"use client";
import React, { useEffect, useState } from "react";
const PrivacyPolicy = () => {
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
              Privacy Policy
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
                If you have any questions about this Privacy Policy, you can
                reach us at{" "}
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
    title: "1. Introduction",
    content:
      "This Privacy Policy explains how Make Headshot collects, uses, and protects your personal information when you use our services.",
  },
  {
    title: "2. Information We Collect",
    content: [
      "Personal details such as name, email, and payment information.",
      "Uploaded media including images for headshot generation.",
      "Usage data like IP address, browser type, and device info.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "To provide and maintain our services.",
      "To personalize your experience.",
      "To improve platform performance and functionality.",
      "To communicate with you, including updates and support.",
    ],
  },
  {
    title: "4. Sharing Your Information",
    content:
      "We do not sell your personal information. We may share it with trusted third-party services that help us operate our business (e.g., hosting, analytics, payment gateways).",
  },
  {
    title: "5. Cookies and Tracking",
    content:
      "We use cookies and similar tracking technologies to enhance user experience and collect analytics data. You can control cookie settings through your browser.",
  },
  {
    title: "6. Data Retention",
    content:
      "We retain your data only as long as necessary for the purposes described. You may request deletion of your data at any time.",
  },
  {
    title: "7. Data Security",
    content:
      "We use industry-standard measures to protect your data. However, no online transmission is 100% secure.",
  },
  {
    title: "8. Your Rights",
    content: [
      "Access the information we hold about you.",
      "Request correction or deletion of your data.",
      "Opt-out of marketing emails at any time.",
    ],
  },
  {
    title: "9. Children’s Privacy",
    content:
      "Our services are not directed to children under 13. We do not knowingly collect information from anyone under this age.",
  },
  {
    title: "10. Changes to This Policy",
    content:
      "We may update this policy from time to time. You will be notified of major changes via email or on our platform.",
  },
];

export default PrivacyPolicy;
