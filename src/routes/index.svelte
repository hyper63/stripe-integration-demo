<script>
	async function register(price) {
		const res = await fetch('/checkout.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				priceId: price
			})
		});
		const { redirect } = await res.json();
		window.location = redirect;
	}
	const startup = () => register('price_1JS54qCdTeU3dtdY10ujCW3o');
	const agency = () => register('price_1JSLJBCdTeU3dtdYmNisu4cH');
</script>

<header>
	<h1>Stripe Demo</h1>
	<p>With SvelteKit</p>
	<br />
	<p>Choose a subscription plan for hyper:</p>
	<br />
	<p>
		<button on:click={startup}><b>Startup Plan <br /> $500/mo</b></button>
		<button on:click={agency}><b>Agency Plan <br /> $2000/mo</b></button>
	</p>
</header>
