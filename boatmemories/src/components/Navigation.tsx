import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            >
              ⛵ BoatMemories
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
            >
              Create
            </Link>

            {user ? (
              <Link
                to="/account"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                My Memories
              </Link>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors py-2"
              >
                Create
              </Link>

              {user ? (
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all text-center"
                >
                  My Memories
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleGoogleSignIn();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
