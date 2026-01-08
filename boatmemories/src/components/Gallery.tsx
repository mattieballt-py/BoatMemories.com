import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    captain: 'Captain Sarah',
    yacht: 'Sunseeker 76',
    location: 'Antibes, France',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80'
  },
  {
    id: 2,
    captain: 'Captain Mike',
    yacht: 'Azimut Grande',
    location: 'Nassau, Bahamas',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'
  },
  {
    id: 3,
    captain: 'Captain Elena',
    yacht: 'Ferretti 920',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
  },
  {
    id: 4,
    captain: 'Captain James',
    yacht: 'Princess Y85',
    location: 'Monaco Harbor',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80'
  },
  {
    id: 5,
    captain: 'Captain Maria',
    yacht: 'Riva 88',
    location: 'Amalfi Coast',
    image: 'https://images.unsplash.com/photo-1535024966711-94786c6768c8?w=800&q=80'
  },
  {
    id: 6,
    captain: 'Captain David',
    yacht: 'Pershing 9X',
    location: 'Ibiza, Spain',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80'
  },
  {
    id: 7,
    captain: 'Captain Lisa',
    yacht: 'Benetti Oasis',
    location: 'St. Barts',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80'
  },
  {
    id: 8,
    captain: 'Captain Tom',
    yacht: 'Mangusta 165',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
  },
  {
    id: 9,
    captain: 'Captain Anna',
    yacht: 'Sanlorenzo SL96',
    location: 'Portofino, Italy',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80'
  },
  {
    id: 10,
    captain: 'Captain Chris',
    yacht: 'Leopard 34M',
    location: 'Dubai Marina',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'
  },
  {
    id: 11,
    captain: 'Captain Sophie',
    yacht: 'Majesty 100',
    location: 'Mykonos, Greece',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80'
  },
  {
    id: 12,
    captain: 'Captain Alex',
    yacht: 'Absolute Navetta',
    location: 'Seychelles',
    image: 'https://images.unsplash.com/photo-1535024966711-94786c6768c8?w=800&q=80'
  }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery of Memories
          </h2>
          <p className="text-xl text-gray-600">
            Join 35+ captains who've preserved their perfect charters
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image with overlay effect */}
              <div className="aspect-[2/3] overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={`${item.yacht} in ${item.location}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-lg mb-1">{item.captain}</h3>
                <p className="text-sm opacity-90">{item.yacht}</p>
                <p className="text-sm opacity-75 flex items-center mt-2">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {item.location}
                </p>
              </div>

              {/* Art style indicator */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                Oil Painting
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-lg">
            Each artwork is a unique, AI-generated masterpiece in the style of Turner
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
