# 🚀 BoatMemories.com - Deployment Checklist

Complete this checklist before launching your yacht memories business.

## ✅ Pre-Launch Setup (30 minutes)

### 1. Environment Setup
- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new Supabase project
- [ ] Copy `.env.example` to `.env`
- [ ] Add `REACT_APP_SUPABASE_URL` to `.env`
- [ ] Add `REACT_APP_SUPABASE_ANON_KEY` to `.env`

### 2. Database Setup
- [ ] Open Supabase SQL Editor
- [ ] Copy contents of `supabase-schema.sql`
- [ ] Run SQL script in Supabase
- [ ] Verify `memories` table exists
- [ ] Verify `yacht-photos` storage bucket exists

### 3. Authentication Setup
- [ ] Go to Supabase → Authentication → Providers
- [ ] Enable Google OAuth
- [ ] Create Google OAuth app at [console.cloud.google.com](https://console.cloud.google.com)
- [ ] Add Google Client ID to Supabase
- [ ] Add Google Client Secret to Supabase
- [ ] Add redirect URLs: `http://localhost:3000/account` and your production URL

### 4. OpenAI Setup
- [ ] Create OpenAI account at [platform.openai.com](https://platform.openai.com)
- [ ] Add payment method (DALL-E 3 requires paid account)
- [ ] Add $20 minimum credit
- [ ] Generate API key
- [ ] Add `REACT_APP_OPENAI_API_KEY` to `.env`
- [ ] Test with a single image generation

### 5. Stripe Setup
- [ ] Create Stripe account at [stripe.com](https://stripe.com)
- [ ] Get test mode publishable key
- [ ] Add `REACT_APP_STRIPE_PUBLISHABLE_KEY` to `.env`
- [ ] (Later) Set up webhook for payment confirmation

### 6. Local Testing
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Visit `http://localhost:3000`
- [ ] Test homepage loads correctly
- [ ] Test navigation to /create page
- [ ] Test photo upload (without generating art)
- [ ] Verify all images load in gallery
- [ ] Test responsive design on mobile

## 🌐 Production Deployment (15 minutes)

### 7. GitHub Setup
- [ ] Create GitHub repository
- [ ] Push code to GitHub:
  ```bash
  git add .
  git commit -m "Initial BoatMemories.com launch"
  git push origin main
  ```

### 8. Vercel Deployment
- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Add environment variables in Vercel:
  - [ ] `REACT_APP_SUPABASE_URL`
  - [ ] `REACT_APP_SUPABASE_ANON_KEY`
  - [ ] `REACT_APP_STRIPE_PUBLISHABLE_KEY`
  - [ ] `REACT_APP_OPENAI_API_KEY`
- [ ] Deploy to production
- [ ] Test production URL works

### 9. Domain Setup (Optional)
- [ ] Purchase domain (e.g., boatmemories.com)
- [ ] Add custom domain in Vercel
- [ ] Update DNS records
- [ ] Wait for SSL certificate
- [ ] Update Google OAuth redirect URLs with new domain
- [ ] Test with custom domain

### 10. Supabase Production Config
- [ ] Add production URL to Supabase → Authentication → URL Configuration
- [ ] Add production URL to allowed redirect URLs
- [ ] Test Google OAuth on production

## 🎨 Content & Marketing (1-2 hours)

### 11. Create Real Sample Artworks
- [ ] Generate 5 real yacht paintings using DALL-E 3
- [ ] Use different locations (Monaco, Bahamas, Amalfi, etc.)
- [ ] Save high-quality versions
- [ ] (Optional) Replace gallery placeholder images

### 12. Marketing Setup
- [ ] Set up Google Analytics (optional)
- [ ] Create Instagram business account
- [ ] Create Facebook page
- [ ] Prepare initial posts about the service
- [ ] Join yacht captain Facebook groups
- [ ] Join yachting forums (YachtForums.com, etc.)

### 13. Payment Processing
- [ ] Switch Stripe to live mode
- [ ] Update Stripe keys in Vercel
- [ ] Test end-to-end payment flow
- [ ] Set up Stripe webhook endpoint (for future)
- [ ] Configure automated email delivery (for future)

## 🧪 Final Testing (30 minutes)

### 14. Full User Journey Test
- [ ] Visit homepage
- [ ] Click "Preserve My Memory"
- [ ] Select location from dropdown
- [ ] Upload 3 yacht photos
- [ ] Wait for AI generation (costs $0.04)
- [ ] View watermarked preview
- [ ] Test both pricing plans display
- [ ] Enter test email
- [ ] Click purchase (don't complete in test mode)
- [ ] Verify navigation works
- [ ] Test mobile responsive design

### 15. Browser Testing
- [ ] Test on Chrome
- [ ] Test on Safari
- [ ] Test on Firefox
- [ ] Test on mobile iOS Safari
- [ ] Test on mobile Android Chrome

### 16. Performance Check
- [ ] Run Lighthouse audit
- [ ] Check page load speed
- [ ] Verify images load properly
- [ ] Test on slow 3G connection
- [ ] Optimize if needed

## 📣 Launch Day (2-4 hours)

### 17. Soft Launch
- [ ] Post in yacht captain Facebook groups
- [ ] Share on LinkedIn with yacht industry hashtags
- [ ] Post on Instagram with yacht hashtags
- [ ] Email 5-10 friends in yachting industry
- [ ] Ask for feedback

### 18. Monitor First Users
- [ ] Check Supabase logs for errors
- [ ] Monitor Vercel analytics
- [ ] Check OpenAI usage dashboard
- [ ] Watch for payment attempts
- [ ] Respond to any support questions

### 19. Collect Feedback
- [ ] Ask first users for testimonials
- [ ] Get permission to use their photos/testimonials
- [ ] Note any bugs or issues
- [ ] Document feature requests

## 🎯 First Week Goals

### 20. Initial Traction
- [ ] Get 10 website visits
- [ ] Get 3 free previews generated
- [ ] Make 1 sale ($39 or $79)
- [ ] Get 1 real testimonial
- [ ] Share success on social media

### 21. Iterate & Improve
- [ ] Fix any bugs discovered
- [ ] Add user feedback improvements
- [ ] Replace 1-2 fake testimonials with real ones
- [ ] Optimize conversion rate
- [ ] Consider adding new locations

## 💰 Revenue Targets

### Month 1 Goal: $1000
- 10 Gallery Edition sales @ $79 = $790
- 5 Print File sales @ $39 = $195
- **Total: $985**

### Month 2 Goal: $2500
- 25 Gallery Edition sales
- 15 Print File sales

### Month 3 Goal: $5000+
- Scale with paid ads
- Partner with yacht charter companies
- Add referral program

## 🔐 Security Improvements (After First Sale)

### 22. Production Security
- [ ] Move OpenAI API to backend/serverless function
- [ ] Implement proper watermarking
- [ ] Set up Stripe webhooks
- [ ] Add email delivery system (Resend, SendGrid)
- [ ] Enable rate limiting
- [ ] Add CAPTCHA to forms

## 📊 Analytics & Tracking

### 23. Business Metrics
- [ ] Track daily visitors
- [ ] Monitor conversion rate (visits → purchases)
- [ ] Track revenue per day/week/month
- [ ] Calculate customer acquisition cost
- [ ] Monitor DALL-E API costs
- [ ] Track most popular locations

## 🎉 Success Checklist

You're ready to launch when:
- ✅ Site loads on production URL
- ✅ Users can sign in with Google
- ✅ Photos upload successfully
- ✅ AI generates paintings (tested with real $0.04 cost)
- ✅ Preview shows watermarked image
- ✅ Payment form displays correctly
- ✅ All pages are mobile responsive
- ✅ No console errors
- ✅ SSL certificate active (https://)

## 🆘 Emergency Contacts

If something breaks:
1. Check Vercel logs
2. Check Supabase logs
3. Check browser console
4. Check OpenAI API status
5. Check Stripe dashboard

## 🎯 First Sale Tomorrow Plan

1. **Today**: Complete deployment checklist
2. **Today**: Generate 2-3 sample artworks
3. **Today**: Post in 3 yacht groups
4. **Tomorrow**: Follow up in groups
5. **Tomorrow**: Direct message 10 yacht captains
6. **Tomorrow**: Offer 50% off launch discount

---

**Good luck with your launch! 🚀**

Remember: The first sale proves the concept. The first 10 sales validate the market. The first 100 sales make it a real business.

*You've got this!*
