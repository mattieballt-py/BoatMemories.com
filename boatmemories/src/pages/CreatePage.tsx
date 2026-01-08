import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { generateBoatArt } from '../utils/openai';

const LOCATIONS = [
  'Antibes, France',
  'Monaco Harbor',
  'Amalfi Coast, Italy',
  'Portofino, Italy',
  'Santorini, Greece',
  'Mykonos, Greece',
  'Ibiza, Spain',
  'Mallorca, Spain',
  'Nassau, Bahamas',
  'St. Barts, Caribbean',
  'Turks and Caicos',
  'British Virgin Islands',
  'Dubai Marina, UAE',
  'Maldives',
  'Seychelles',
  'Phuket, Thailand',
  'Sydney Harbor, Australia',
  'French Riviera',
  'Croatian Coast',
  'Turkish Riviera'
];

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (photos.length + newFiles.length > 3) {
        setError('Maximum 3 photos allowed');
        return;
      }
      setPhotos([...photos, ...newFiles]);
      setError('');
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      setError('Please select a location');
      return;
    }

    if (photos.length === 0) {
      setError('Please upload at least one photo');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Sign in anonymously or redirect to auth
        const { data: anonUser, error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
      }

      // Upload photos to Supabase Storage
      const photoUrls: string[] = [];
      for (const photo of photos) {
        const fileName = `${Date.now()}-${photo.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('yacht-photos')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('yacht-photos')
          .getPublicUrl(fileName);

        photoUrls.push(urlData.publicUrl);
      }

      // Generate AI artwork
      setGenerating(true);
      const artworkUrl = await generateBoatArt(location);

      // Get current user again
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      // Save to database
      const { data: memory, error: dbError } = await supabase
        .from('memories')
        .insert({
          user_id: currentUser?.id,
          location,
          photos: photoUrls,
          watermarked_url: artworkUrl,
          preview_url: artworkUrl,
          payment_status: 'pending',
          payment_amount: 0
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Navigate to preview page
      navigate(`/preview/${memory.id}`);

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to create memory. Please try again.');
    } finally {
      setUploading(false);
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Preserve Your Memory
            </h1>
            <p className="text-xl text-gray-600">
              Tell us about your perfect charter moment
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              {/* Location Selection */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Where was this memory made? *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-gray-900"
                  required
                >
                  <option value="">Select your charter location...</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Upload */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Upload Your Yacht Photos (Max 3) *
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Upload photos of your yacht, the view, or the moment you want to preserve
                </p>

                {/* Upload button */}
                {photos.length < 3 && (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}

                {/* Photo previews */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={uploading || generating}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: uploading || generating ? 1 : 1.02 }}
                whileTap={{ scale: uploading || generating ? 1 : 0.98 }}
              >
                {uploading ? 'Uploading Photos...' : generating ? 'Creating Your Masterpiece...' : '🎨 Create My Oil Painting (Free Preview)'}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                You'll see a watermarked preview before purchasing
              </p>
            </form>
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

export default CreatePage;
