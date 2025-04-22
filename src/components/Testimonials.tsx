import type React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Marketing Director',
      image: 'https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc',
      quote: "HeadshotsAI transformed my LinkedIn profile. I received more connection requests and interview offers within the first week of updating my photo.",
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Software Engineer',
      image: 'https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc',
      quote: "The quality is incredible! No one believes me when I tell them it was AI-generated. Fast, affordable, and professional results.",
    },
    {
      id: 3,
      name: 'Michael Roberts',
      role: 'Freelance Consultant',
      image: 'https://res.cloudinary.com/db3xtka1o/image/upload/f_auto/w_300/q_70/tools/tdcr5z6mkpdep1ltioxc',
      quote: "As a freelancer, I needed a professional headshot but couldn't justify the cost of a photo session. HeadshotsAI was the perfect solution.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">What Our Users Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Professionals around the world trust HeadshotsAI for their headshot needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mr-4 h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-gray-700">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-6 py-2 text-blue-800">
            <span className="mr-2 text-lg font-bold">4.9</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2">from over 10,000 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
