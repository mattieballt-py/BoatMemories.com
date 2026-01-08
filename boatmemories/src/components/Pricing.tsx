import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Print File',
    price: 39,
    description: 'Perfect for personal display',
    features: [
      'High-resolution (150 DPI)',
      'Up to 16x20" prints',
      'Digital file only',
      'Lifetime download access',
      'Standard processing'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Gallery Edition',
    price: 79,
    description: 'The professional choice',
    features: [
      'Ultra high-res (300 DPI)',
      'Perfect for 24x36" framing',
      'Commercial print ready',
      'Digital backup included',
      'Lifetime download access',
      'Priority processing',
      'Email support'
    ],
    cta: 'Most Popular',
    popular: true
  }
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Preserve Your Memory
          </h2>
          <p className="text-xl text-blue-200">
            Choose the perfect format for your masterpiece
          </p>
          <p className="mt-4 text-sm text-blue-300">
            30-day money-back guarantee • Instant digital delivery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden h-full ${
                plan.popular ? 'ring-4 ring-cyan-400 transform scale-105' : ''
              }`}>
                <div className={`p-8 ${plan.popular ? 'bg-gradient-to-br from-cyan-50 to-blue-50' : ''}`}>
                  {/* Pricing header */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">one-time</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <motion.button
                    onClick={() => navigate('/create')}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Instant Delivery
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Money-back Guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
