import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Captain Sarah Mitchell',
    yacht: 'M/Y Sunseeker 76',
    location: 'Monaco',
    text: "Absolutely stunning. My charter guests ask about it every single time. The signwriter quoted me £800 — this cost £79 and looks like it belongs in a gallery.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Captain Mike Anderson',
    yacht: 'M/Y Azimut Grande',
    location: 'Bahamas',
    text: "That golden hour in Nassau, perfectly captured. It's framed 24x36 in our main saloon and guests compliment it daily. Worth every penny.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Captain Elena Rodriguez',
    yacht: 'M/Y Ferretti 920',
    location: 'Greece',
    text: "The Santorini sunset charter that changed my life. Now it's on my wall forever. The oil painting style is absolutely breathtaking.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Captain James Wilson',
    yacht: 'M/Y Princess Y85',
    location: 'Amalfi Coast',
    text: "I've shown this to every captain in the marina. The quality is exceptional — looks exactly like a Turner painting. Best £79 I've ever spent.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Captain Maria Costa',
    yacht: 'M/Y Riva 88',
    location: 'Ibiza',
    text: "My first season as captain, and this is the memory I want to keep forever. The impressionist style captures the emotion perfectly.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 6,
    name: 'Captain David Chen',
    yacht: 'M/Y Pershing 9X',
    location: 'Dubai',
    text: "Delivered instantly, printed at 24x36, and framed in our yacht club. Everyone thinks it's a commissioned piece. Incredible value.",
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=6'
  }
];

const Testimonials: React.FC = () => {
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
            What Captains Say
          </h2>
          <p className="text-xl text-gray-600">
            Join the community of yacht captains preserving their perfect moments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Captain info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.yacht}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional trust signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">35+ satisfied captains • 4.9/5 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
