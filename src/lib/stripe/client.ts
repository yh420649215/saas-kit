import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }
  return new Stripe(key);
}

export function getStripePublishableKey() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable");
  }
  return key;
}
