import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { parcelId, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: { currency: 'usd', product_data: { name: `Parcel #${parcelId}` }, unit_amount: 1000 * 100 }, quantity: 1 }],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
      metadata: { parcelId, email }
    });

    // Itt lehetne email küldés nodemailer-rel a session létrehozása után

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
