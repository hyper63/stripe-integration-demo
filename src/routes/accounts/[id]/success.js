import { default as Stripe } from 'stripe'

const stripe = Stripe(process.env['STRIPE_SECRET_KEY'])

export async function get({ params, query }) {
  const session_id = query.get('session_id')
  const { id } = params

  const session = await stripe.checkout.sessions.retrieve(session_id)
  console.log(session)
  let account = await fetch(`http://localhost:6363/data/stripe/${id}`).then(r => r.json())

  if (session.customer === account.customerId) {
    account.active = true

    const res = await fetch(`http://localhost:6363/data/stripe/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    })
    if (res.ok) {
      return {
        status: 302,
        headers: {
          location: `/accounts/${id}`
        }
      }
    }
  }

  return {
    status: 302,
    headers: {
      location: '/404'
    }
  }
}