import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { parcel } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `Parcel #${parcel.id}` },
          unit_amount: parcel.price*100
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}?success=true&parcelId=${parcel.id}`,
      cancel_url: `${req.headers.origin}?canceled=true`
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
