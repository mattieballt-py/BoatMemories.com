import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, Memory } from '../lib/supabase';
import { PRICING } from '../lib/stripe';

const PreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'GALLERY' | 'PRINT'>('GALLERY');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadMemory();
  }, [id]);

  const loadMemory = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setMemory(data);
    } catch (err) {
      console.error('Error loading memory:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setProcessingPayment(true);

    try {
      // In production, you would create a Stripe Checkout session here
      // For now, we'll simulate a successful payment

      // Update memory with payment info
      const { error } = await supabase
        .from('memories')
        .update({
          payment_status: 'paid',
          payment_amount: PRICING[selectedPlan].price,
          email: email,
          final_url: memory?.preview_url // In production, this would be the unwatermarked version
        })
        .eq('id', id);

      if (error) throw error;

      // Show success message
      alert(`Success! Your ${PRICING[selectedPlan].name} has been purchased for $${PRICING[selectedPlan].price}. Check your email at ${email} for the download link.`);

      navigate('/account');

    } catch (err: any) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your masterpiece...</p>
        </div>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Memory not found</p>
          <button onClick={() => navigate('/')} className="text-cyan-600 mt-4">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Memory, Preserved Forever
            </h1>
            <p className="text-xl text-gray-600">
              {memory.location}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Artwork Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="relative">
                  <img
                    src={memory.watermarked_url || ''}
                    alt="Your yacht memory"
                    className="w-full rounded-lg"
                  />
                  {/* Watermark overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/10 backdrop-blur-[1px] px-8 py-4 rounded-lg rotate-[-15deg]">
                      <p className="text-white/70 text-3xl font-bold tracking-wider">
                        PREVIEW
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Preview Features:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Turner-style impressionist oil painting
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Dramatic golden hour lighting
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Perfect for framing & display
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Purchase Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Unlock Your Masterpiece
                </h2>

                {/* Plan selection */}
                <div className="space-y-4 mb-8">
                  {/* Gallery Edition */}
                  <div
                    onClick={() => setSelectedPlan('GALLERY')}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedPlan === 'GALLERY'
                        ? 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {PRICING.GALLERY.name}
                          </h3>
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            MOST POPULAR
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {PRICING.GALLERY.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">
                          ${PRICING.GALLERY.price}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {PRICING.GALLERY.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Print File */}
                  <div
                    onClick={() => setSelectedPlan('PRINT')}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedPlan === 'PRINT'
                        ? 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {PRICING.PRINT.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {PRICING.PRINT.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">
                          ${PRICING.PRINT.price}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {PRICING.PRINT.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Email input */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Email for delivery
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="captain@yacht.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    required
                  />
                </div>

                {/* Purchase button */}
                <motion.button
                  onClick={handlePurchase}
                  disabled={processingPayment || !email}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={{ scale: processingPayment ? 1 : 1.02 }}
                  whileTap={{ scale: processingPayment ? 1 : 0.98 }}
                >
                  {processingPayment ? 'Processing...' : `Unlock for $${PRICING[selectedPlan].price}`}
                </motion.button>

                {/* Trust signals */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure payment powered by Stripe
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Instant digital delivery to your email
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Back button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewPage;
