<script context="module">
	export async function load({ page, fetch }) {
		const url = `/api/accounts/${page.params.id}.json`;
		const res = await fetch(url);
		const account = await res.json();

		if (res.ok) {
			return {
				props: {
					account
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not find account`)
		};
	}
</script>

<script>
	export let account = { id: 'unknown' };
	console.log(account);
	const checkoutUrl = `/accounts/${account.id}/checkout`;
	const billingUrl = `/accounts/${account.id}/billing`;
</script>

<header>
	<h1>Account</h1>
	<p>foo.com account</p>
</header>
<main>
	<p><b>Name:</b> {account.username}</p>
	<p><b>Email:</b> {account.email}</p>
	{#if !account.active}
		<p>
			<b>Thank you</b> for registering for foo.com! We are excited to show you the service, but first
			we need to finalize your registration with your billing information.
		</p>
		<br />
		<p><a href={checkoutUrl}><b>Complete Setup</b></a></p>
	{:else}
		<p><b>Account Status:</b> active</p>
		<p><a href={billingUrl}><i>Billing Info</i></a></p>
	{/if}
</main>
