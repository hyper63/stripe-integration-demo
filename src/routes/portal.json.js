import stripe from 'stripe'

const s = stripe(process.env['STRIPE_SECRET_KEY'])

export async function post({ body }) {

  const session = await s.billingPortal.sessions.create({
    customer: 'cus_K6ZDY6X26Cx7xH',
    return_url: 'https://3000-sapphire-llama-k6nwkurq.ws-us16.gitpod.io'
  })

  return {
    body: {
      redirect: session.url
    }
  }
}