"use client";
import React, { useEffect, useState } from "react";

const dummyBlogs = [
  {
    title: "How to Take the Perfect Headshot",
    description:
      "Learn tips and tricks to capture professional headshots with ease.",
    date: "May 20, 2025",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    slug: "perfect-headshot",
  },
  {
    title: "5 Reasons to Use AI Headshots",
    description:
      "Why AI-generated headshots are changing the professional world.",
    date: "May 10, 2025",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    slug: "ai-headshots-benefits",
  },
  {
    title: "How Entrepreneurs Are Leveraging AI Branding",
    description:
      "See how startup founders are leveling up their image using AI.",
    date: "April 28, 2025",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    slug: "entrepreneurs-ai-branding",
  },
  {
    title: "The Future of Professional Photography",
    description:
      "Exploring how technology is shaping professional photography.",
    date: "April 15, 2025",
    image:
      "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=800&q=80",
    slug: "future-of-photography",
  },
  {
    title: "Top Tips for Virtual Meeting Presence",
    description: "How to present yourself confidently during virtual calls.",
    date: "March 30, 2025",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    slug: "virtual-meeting-tips",
  },  
  {
    title: "Why Lighting is Everything in Headshots",
    description:
      "The impact of lighting on professional photos and how to optimize it.",
    date: "March 15, 2025",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    slug: "lighting-in-headshots",
  },
  {
    title: "How AI Can Help Build Your Personal Brand",
    description:
      "Leveraging AI tools to enhance your personal branding strategy.",
    date: "February 28, 2025",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    slug: "ai-personal-brand",
  },
];

const BlogPage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-white py-16 px-6">
      <div
        className={`max-w-6xl mx-auto transition-opacity duration-1000 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Blog & Resources
        </h1>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {dummyBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <a
                  href={`/blog/${blog.slug}`}
                  className="inline-block text-blue-600 font-semibold hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
