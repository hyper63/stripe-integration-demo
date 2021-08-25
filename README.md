<h1 align="center">Stripe Integration Demo with SvelteKit</h1>
<p>Integrate Stripe with SvelteKit</p>

---

## Tasks

* Create a subscription for a product
* Create a customer for app
* Get Invoice List
* Get Single Invoice

With Stripe there are two ways to handle subscription billing:

* Using Checkout

Using checkout, you redirect the user/customer to the checkout session portal and the customer portal.

The checkout session portal will create a customer, subscription and payment intent for the customer,
the customer portal will allow the customer to manage their billing information, view billing history,
etc.

---

NOTES: Focused on recurring subscriptions.

The stripe api is a REST API that provides endpoints for creating customers, subscriptions, payment methods, checkout sessions, and billingPortal sessions.

There is also a nodejs sdk that wraps the api calls that can be used as an implementation.

Documentation: https://stripe.com/docs/api?lang=node

In order to use the api, you need a SECRET KEY, this key must be protected and secure, in other words it should not be used on the browser and should only be available on the server.

In order to create a customer via nodejs:

``` js
import { default as Stripe } from 'stripe'

const stripe = Stripe('sk_test_1234')
const customer = await stripe.customers.create({
  name: 'AccountName',
  email: 'CustomerEmail'
})
```

> For more info see: https://stripe.com/docs/api/customers/create

Using the customerId and a priceId you can create a checkout session.

> A checkout session is a link to the checkout portal that contains the customer and price plan information 
> and gives the customer the ability to securely enter their billing information.

## Checkout Session

``` js
import { default as Stripe } from 'stripe'

const stripe = Stripe('sk_test_1234')

const session = await stripe.checkout.sessions.create({
  customerId: 'cus_1234',
  payment_method_types: ['card'],
  line_items: [
    { price: 'price_1234'}
  ],
  mode: 'payment',
  success_url: 'https:/example.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/cancel'
})

// use this url to redirect the user to the checkout portal
console.log(session.url)
```

> For more information see: https://stripe.com/docs/api/checkout/sessions/create

The success url can return the session_id, in which you can use to look up customer information
at the point of the redirect.

The cancel url is used when the user clicks cancel or back to return to the launching page.

> NOTE: If you have not already stored the customerId, it is at this point you will want to 
> store the customerId and the service plan the customer selected.

---

Once a customer is registered, you will want the customer to access their billing information, so that
they can change plans, cancel a plan, or access their invoices and receipts.

Using the billingPortal API is the best api for this purpose

``` js
import { default as Stripe } from 'stripe'

const stripe = Stripe('sk_test_1234')

const session = await stripe.billingPortal.sessions.create({
  customer: 'cus_1234',
  return_url: 'https://example.com/account'
})

// you will want to redirect the user to this session url
console.log(session.url)

```

> For more info see: https://stripe.com/docs/api/customer_portal/sessions/create


Other potential apis

* How to find a customer by email?

* How to update a subscription?

* ???