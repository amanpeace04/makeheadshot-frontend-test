import type React from 'react';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: '19',
      features: [
        '10 AI Headshots',
        '3 Different Styles',
        'Professional Background Options',
        'HD Downloads',
        'Commercial Usage Rights',
      ],
      recommended: false,
    },
    {
      id: 2,
      name: 'Pro',
      price: '39',
      features: [
        '30 AI Headshots',
        '8 Different Styles',
        'Professional Background Options',
        'HD Downloads',
        'Commercial Usage Rights',
        'Priority Processing',
        'Remove Background Feature',
      ],
      recommended: true,
    },
    {
      id: 3,
      name: 'Business',
      price: '99',
      features: [
        '100 AI Headshots',
        'All Available Styles',
        'Professional Background Options',
        'HD Downloads',
        'Commercial Usage Rights',
        'Priority Processing',
        'Remove Background Feature',
        'Personal Brand Customization',
        'Dedicated Support',
      ],
      recommended: false,
    },
  ];

  return (
    <div id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Choose the plan that works best for your needs. No hidden fees, no subscriptions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border ${
                plan.recommended ? 'border-blue-500' : 'border-gray-200'
              } bg-white p-6 shadow-md`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 text-center text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600"> one-time payment</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full ${
                  plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } py-3 font-semibold transition duration-300`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gray-50 p-6 text-center">
          <h3 className="mb-4 text-xl font-bold">Need a custom solution?</h3>
          <p className="mb-6 text-gray-600">
            Contact us for enterprise pricing or custom requirements for your team.
          </p>
          <button className="rounded-full border border-blue-600 bg-transparent px-6 py-2 font-semibold text-blue-600 transition duration-300 hover:bg-blue-50">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
