import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, move this to a backend
});

export const generateBoatArt = async (location: string): Promise<string> => {
  const prompt = `Dramatic oil painting of luxury yacht at golden hour sunset in ${location}, impressionist style like Turner, warm golden tones, captain on flybridge, sparkling turquoise water, distant coastline with villas, 2x3 aspect ratio, masterpiece quality, gallery wall art`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1792", // 2:3 aspect ratio
      quality: "hd",
      style: "vivid"
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate artwork');
  }
};

export const addWatermark = (imageUrl: string): string => {
  // In a real implementation, this would add a watermark to the image
  // For now, we'll return the original URL
  // You would typically do this server-side
  return imageUrl;
};