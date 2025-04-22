import type React from 'react';

const BeforeAfter: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">See the Transformation</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Upload your selfie and get a professional headshot within minutes.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="w-full p-6 md:w-1/2">
                <h3 className="mb-4 text-center text-xl font-bold">Before</h3>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://cdn.dribbble.com/userupload/38078935/file/original-2a9ab1c8fe337581a882bc130f2ce207.png?format=webp&resize=400x300&vertical=center"
                    alt="Before transformation"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-gray-600">Your regular selfie</p>
              </div>

              <div className="w-full p-6 md:w-1/2">
                <h3 className="mb-4 text-center text-xl font-bold">After</h3>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://cdn.dribbble.com/userupload/38078935/file/original-2a9ab1c8fe337581a882bc130f2ce207.png?format=webp&resize=400x300&vertical=center"
                    alt="After transformation"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-gray-600">Professional AI Headshot</p>
              </div>
            </div>

            <div className="relative inset-0 flex items-center justify-center p-6">
              <button className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700">
                Try It Now
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Our AI technology analyzes your facial features to create professional studio-quality headshots that enhance your professional presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
