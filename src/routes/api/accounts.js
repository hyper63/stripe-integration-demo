import { default as Stripe } from 'stripe'

const stripe = Stripe(process.env['STRIPE_SECRET_KEY'])

export async function post({ body }) {
  // create stripe Customer
  const customer = await stripe.customers.create({
    name: body.username,
    email: body.email
  })

  body.customerId = customer.id
  body.type = 'account'

  // create account
  const res = await fetch('http://localhost:6363/data/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const { msg } = await res.json()
    return {
      body: { ok: false, msg }
    }
  }

  const { id } = await res.json()

  return {
    body: {
      ok: true,
      id
    }
  }
}