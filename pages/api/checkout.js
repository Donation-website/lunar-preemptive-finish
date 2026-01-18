import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { email, parcel } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 99900,
        product_data: {
          name: `Lunar Parcel #${parcel}`
        }
      },
      quantity: 1
    }],
    success_url: `${req.headers.origin}/?success=1`,
    cancel_url: `${req.headers.origin}/`
  });

  res.json({ url: session.url });
}
