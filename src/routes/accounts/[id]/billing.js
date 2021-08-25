import { default as Stripe } from 'stripe'

const SERVER = process.env['SERVER']
const stripe = Stripe(process.env['STRIPE_SECRET_KEY'])

export async function get({ params }) {
  const res = await fetch(`http://localhost:6363/data/stripe/${params.id}`)
  const account = await res.json()

  const session = await stripe.billingPortal.sessions.create({
    customer: account.customerId,
    return_url: `${SERVER}/accounts/${account.id}`
  })

  return {
    status: 302,
    headers: {
      location: session.url
    }
  }
}