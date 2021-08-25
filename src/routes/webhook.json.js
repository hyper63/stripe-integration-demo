import stripe from 'stripe'

const s = stripe(process.env['STRIPE_SECRET_KEY'])

export async function post({ body }) {


  return {
    body: {
      ok: true
    }
  }
}
