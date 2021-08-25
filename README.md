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

* Using Elements