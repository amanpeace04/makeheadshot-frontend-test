"use client";
import type React from "react";
import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left text-lg font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "How does HeadshotsAI work?",
      answer:
        "HeadshotsAI uses advanced artificial intelligence to transform your regular photos into professional headshots. Simply upload a few photos of yourself, choose your preferred styles, and our AI will generate multiple professional headshots tailored to your appearance.",
    },
    {
      question: "What kind of photos should I upload?",
      answer:
        "For best results, upload clear, well-lit photos of your face from different angles. Avoid photos with multiple people, sunglasses, or heavy filters. We recommend uploading 5-10 photos for optimal results.",
    },
    {
      question: "How long does it take to receive my AI headshots?",
      answer:
        "Most headshots are generated within minutes. After processing, you will receive an email notification with a link to view and download your professional headshots.",
    },
    {
      question: "Can I use these photos professionally?",
      answer:
        "Yes! All our plans include commercial usage rights. You can use your AI-generated headshots for your LinkedIn profile, company website, social media profiles, presentations, and any other professional purpose.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a satisfaction guarantee. If you are not happy with your headshots, contact us within 7 days of purchase for a full refund.",
    },
    {
      question: "Can I change the background or style after generation?",
      answer:
        "Yes, with our Pro and Business plans, you can regenerate your headshots with different backgrounds and styles. The Basic plan has limited regeneration options.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We take data security seriously. Your photos are encrypted during transmission and storage. We never share your photos with third parties, and all photos are automatically deleted after 30 days.",
    },
  ];

  return (
    <div id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Have questions about HeadshotsAI? Find answers to common questions
            below.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqItems.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Cannot find the answer you are looking for? Contact our support
            team.
          </p>
          <button className="rounded-full border border-blue-600 bg-transparent px-6 py-2 font-semibold text-blue-600 transition duration-300 hover:bg-blue-50">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
