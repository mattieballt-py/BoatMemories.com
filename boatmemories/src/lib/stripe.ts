import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

export const stripePromise = loadStripe(stripePublishableKey);

export const PRICING = {
  GALLERY: {
    price: 79,
    name: 'Gallery Edition',
    description: 'High-resolution 24x36" print-ready file + Digital copy',
    features: [
      'Ultra high-resolution (300 DPI)',
      'Perfect for 24x36" framing',
      'Commercial print ready',
      'Digital backup included',
      'Lifetime download access'
    ]
  },
  PRINT: {
    price: 39,
    name: 'Print File',
    description: 'Standard resolution print file',
    features: [
      'High-resolution (150 DPI)',
      'Suitable for up to 16x20" prints',
      'Digital file only',
      'Lifetime download access'
    ]
  }
};
