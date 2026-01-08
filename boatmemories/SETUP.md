# BoatMemories.com - Setup Guide

Complete React 19 + Tailwind CSS web app that clones MyComicGift UX for yacht memories AI art generator.

## Quick Start

### 1. Install Dependencies

```bash
cd boatmemories
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your actual keys:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
REACT_APP_OPENAI_API_KEY=sk-your-key-here
```

### 3. Set Up Supabase Database

In your Supabase project SQL editor, run the following:

```sql
-- Create memories table
CREATE TABLE memories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  location TEXT NOT NULL,
  photos TEXT[] NOT NULL,
  preview_url TEXT,
  watermarked_url TEXT,
  final_url TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  payment_amount INTEGER DEFAULT 0,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own memories"
  ON memories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memories"
  ON memories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memories"
  ON memories FOR UPDATE
  USING (auth.uid() = user_id);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('yacht-photos', 'yacht-photos', true);

-- Storage policies
CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'yacht-photos');

CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'yacht-photos');
```

### 4. Enable Google OAuth in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add authorized redirect URLs:
   - `http://localhost:3000/account`
   - `https://your-domain.com/account`

### 5. Start Development Server

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial BoatMemories.com setup"
git push origin main
```

### 2. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel dashboard.

### 3. Add Environment Variables in Vercel

In Vercel dashboard → Settings → Environment Variables, add:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`
- `REACT_APP_OPENAI_API_KEY`

### 4. Deploy

```bash
vercel --prod
```

## Features

### Homepage
- ✅ Hero section with emotional copy
- ✅ How It Works (3 steps)
- ✅ Pricing (Gallery $79 / Print $39)
- ✅ Gallery with 12 fake examples
- ✅ Testimonials from 6 captains

### User Flow
1. Home → "Preserve My Memory" → /create
2. Select location + upload 3 photos
3. AI generates Turner-style oil painting
4. View watermarked preview
5. Purchase & unlock high-res file

### Pages
- `/` - Homepage
- `/create` - Location + photo upload
- `/preview/:id` - Watermarked preview + payment
- `/account` - Order history

### Tech Stack
- React 19
- Tailwind CSS 4.x
- Framer Motion (animations)
- Supabase (auth, database, storage)
- OpenAI DALL-E 3 (AI art generation)
- Stripe (payments)
- React Router (routing)

## AI Art Generation

The app uses DALL-E 3 with this exact prompt:

```
Dramatic oil painting of luxury yacht at golden hour sunset in [LOCATION],
impressionist style like Turner, warm golden tones, captain on flybridge,
sparkling turquoise water, distant coastline with villas, 2x3 aspect ratio,
masterpiece quality, gallery wall art
```

## Important Notes

### Security
- The OpenAI API key is currently used in the browser (`dangerouslyAllowBrowser: true`)
- **For production**: Move AI generation to a backend API/serverless function
- Never expose API keys in frontend code in production

### Stripe Integration
- Currently simulated for demo purposes
- **For production**: Implement proper Stripe Checkout
- Add webhook handlers for payment confirmation
- Implement email delivery system

### Watermarking
- Currently returns the original image
- **For production**: Implement server-side watermarking
- Add proper image processing pipeline

## Cost Estimates

### Monthly Costs (Month 1)
- Supabase: Free tier (up to 500MB storage, 50,000 monthly active users)
- Vercel: Free tier (hobby projects)
- OpenAI DALL-E 3: $0.040 per image (HD quality)
- Stripe: 2.9% + $0.30 per transaction

### Revenue Projections
- 10 sales @ $79 = $790
- 5 sales @ $39 = $195
- **Total Month 1**: ~$985 revenue
- **Costs**: ~$100 (AI + transaction fees)
- **Net**: ~$885

## Customization

### Change Pricing
Edit `src/lib/stripe.ts`:

```typescript
export const PRICING = {
  GALLERY: { price: 79, ... },
  PRINT: { price: 39, ... }
};
```

### Add More Locations
Edit `src/pages/CreatePage.tsx`:

```typescript
const LOCATIONS = [
  'Your Location',
  ...
];
```

### Customize Art Style
Edit `src/utils/openai.ts` prompt.

## Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Tailwind styles not loading
Make sure `@import 'tailwindcss';` is in `src/index.css`

### Supabase connection issues
Check your `.env` file has correct credentials

### OpenAI API errors
- Verify API key is valid
- Check you have credits in OpenAI account
- DALL-E 3 requires paid OpenAI account

## Support

For issues, check:
1. Console logs in browser DevTools
2. Supabase logs in dashboard
3. Network tab for API errors

## Next Steps

1. ✅ Deploy to Vercel
2. Add custom domain
3. Set up Stripe production keys
4. Implement backend API for AI generation
5. Add email delivery system
6. Set up analytics (Google Analytics, Plausible)
7. Add real Stripe Checkout
8. Implement proper watermarking
9. Replace 2 fake testimonials with real ones after first 5 sales

## License

MIT License - Feel free to use for your business!
