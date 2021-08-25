import { default as Stripe } from 'stripe'

const SERVER = process.env['SERVER']
const stripe = Stripe(process.env['STRIPE_SECRET_KEY'])

export async function get({ params }) {

  const account = await fetch(`http://localhost:6363/data/stripe/${params.id}`).then(r => r.json())
  console.log(account)

  const session = await stripe.checkout.sessions.create({
    customer: account.customerId,
    payment_method_types: ['card'],
    line_items: [
      { price: 'price_1JS54qCdTeU3dtdY10ujCW3o', quantity: 1 }
    ],
    mode: 'subscription',
    success_url: `${SERVER}/accounts/${account.id}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SERVER}/accounts/${account.id}`
  })

  return {
    status: 302,
    headers: {
      location: session.url
    }
  }
}