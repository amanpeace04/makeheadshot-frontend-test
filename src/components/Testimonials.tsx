import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Patrick Qureshi",
      role: "Founder Sharewine",
      image:
        "https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc",
      quote:
        "We went from spending days developing content to generating it in a fraction of the time. The platform's powerful AI makes creating high-quality content quick and easy, allowing us to focus more on strategy and growth.",
    },
    {
      id: 2,
      name: "Aaron Nosbisch",
      role: "Founder Brez",
      image:
        "https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc",
      quote:
        "Creating content used to be a complicated and time-consuming process. HeadshotsAI simplified everything, allowing us to go from concept to finished content in just a few easy steps.",
    },
    {
      id: 3,
      name: "Jamora Crawford",
      role: "Video strategist Ketchapp",
      image:
        "https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc",
      quote:
        "Our team struggled with tight deadlines and constant content demands. The new platform sped up our creation process, allowing us to meet deadlines without compromising quality.",
    },
    {
      id: 4,
      name: "Janno Calitz",
      role: "Co-founder at Zitlac",
      image:
        "https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc",
      quote: "We got a ROAS of 120%, giving us an unbeatable ROI on ad spend!",
    },
    {
      id: 5,
      name: "Daniel Kenny",
      role: "Co-founder Wassabi",
      image:
        "https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc",
      quote:
        "HeadshotsAI has reduced our cost of content creation by $3,000 and the video generation is much faster.",
    },
    {
      id: 6,
      name: "Derrick Chen",
      role: "Co-founder at Xara shilajit",
      image:
        "https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc",
      quote:
        "We can now make UGC videos for under $9 compare to a traditional UGC video that cost around $150.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What{" "}
          <span className="bg-gradient-to-r from-corporate-blue to-corporate-green bg-clip-text text-transparent">
            they're
          </span>{" "}
          saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-corporate-blue to-corporate-green text-white font-semibold transform hover:-translate-y-1 transition duration-400 shadow-md"
          >
            Try HeadshotsAI Now
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
    </section>
  );
};

export default Testimonials;
