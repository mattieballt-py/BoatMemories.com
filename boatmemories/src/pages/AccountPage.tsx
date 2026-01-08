import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase, Memory } from '../lib/supabase';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        navigate('/');
        return;
      }

      setUser(currentUser);

      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (memory: Memory) => {
    if (memory.payment_status !== 'paid' || !memory.final_url) {
      alert('This memory has not been purchased yet.');
      return;
    }

    // In production, this would trigger a secure download
    window.open(memory.final_url, '_blank');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                My Memories
              </h1>
              <p className="text-xl text-gray-600">
                {user?.email || 'Your preserved yacht moments'}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                + Create New Memory
              </button>
              <button
                onClick={handleSignOut}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Memories list */}
          {memories.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Memories Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Create your first yacht memory and preserve it forever
              </p>
              <button
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                Create Your First Memory
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="aspect-[2/3] overflow-hidden bg-gray-200 relative">
                    <img
                      src={(memory.payment_status === 'paid' ? (memory.final_url || memory.preview_url) : (memory.watermarked_url || memory.preview_url)) || ''}
                      alt={memory.location}
                      className="w-full h-full object-cover"
                    />

                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      {memory.payment_status === 'paid' ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          PURCHASED
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          PREVIEW
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {memory.location}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Created {new Date(memory.created_at).toLocaleDateString()}
                    </p>

                    {memory.payment_status === 'paid' ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-3">
                          ${memory.payment_amount} - Paid
                        </p>
                        <button
                          onClick={() => handleDownload(memory)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/preview/${memory.id}`)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
                      >
                        Complete Purchase
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Back button */}
          <div className="text-center mt-12">
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

export default AccountPage;
