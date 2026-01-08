import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Where was this memory made?',
    description: 'Select your charter location and upload 3 photos of your yacht',
    icon: '📍',
    details: 'Mediterranean, Caribbean, or any stunning location'
  },
  {
    number: 2,
    title: 'See your watermarked oil painting preview',
    description: 'AI transforms your photos into a Turner-style masterpiece',
    icon: '🎨',
    details: 'Dramatic golden hour, impressionist beauty'
  },
  {
    number: 3,
    title: 'Unlock high-res print file',
    description: '$79 Gallery Edition (24x36") or $39 Print File',
    icon: '✨',
    details: 'Ready to frame and display with pride'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to preserve your perfect charter forever
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 h-full">
                {/* Step number badge */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6 text-center">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-cyan-600 font-medium">
                  {step.details}
                </p>
              </div>

              {/* Connecting arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 italic">
            "Captains compliment daily" — Common enemy: Signwriter quoted £800
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
