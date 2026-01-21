import Stripe from 'stripe'
import nodemailer from 'nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const { parcel } = req.query

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: `Lunar Parcel #${parcel}` },
        unit_amount: 1000, // 10 USD
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?parcel=${parcel}`,
    cancel_url: `${req.headers.origin}`
  })

  // Email küldés fizetés után
  if (req.body.email) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: '"Lunar Rights" <noreply@lunar.com>',
      to: req.body.email,
      subject: `Your Lunar Parcel #${parcel}`,
      text: `You purchased Lunar Parcel #${parcel}. This is your speculative pre-emptive certificate.`
    })
  }

  res.status(200).json({ url: session.url })
}
