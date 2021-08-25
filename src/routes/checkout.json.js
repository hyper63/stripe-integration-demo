import stripe from 'stripe'

const s = stripe(process.env['STRIPE_SECRET_KEY'])

export async function post({ body }) {
  const session = await s.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: body.priceId,
        quantity: 1
      }
    ],
    success_url: `https://3000-sapphire-llama-k6nwkurq.ws-us16.gitpod.io/checkout.json?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: 'https://3000-sapphire-llama-k6nwkurq.ws-us16.gitpod.io'
  })
  return {
    body: {
      redirect: session.url
    }
  }
}

export async function get({ query }) {
  const session = await s.checkout.sessions.retrieve(query.get('session_id'))
  const customer = await s.customers.retrieve(session.customer)
  console.log(customer)
  return {
    headers: {
      location: '/success?customer=' + customer.name
    },
    status: 302
  }

}