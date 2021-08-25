<script>
	let username, password, email, confirm;

	async function createAccount() {
		if (password === confirm) {
			const res = await fetch('/api/accounts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password, email })
			});
			if (res.ok) {
				const { id } = await res.json();
				window.location = `/accounts/${id}`;
			}
		}
	}
</script>

<header>
	<h1>Sign Up</h1>
</header>
<main>
	<p>STEP 1: Create the following form to register for a foo.com account.</p>
	<form on:submit|preventDefault={createAccount}>
		<div>
			<label>
				Username
				<input type="text" bind:value={username} />
			</label>
		</div>
		<div>
			<label>
				Password
				<input type="password" bind:value={password} />
			</label>
		</div>
		<div>
			<label>
				Confirm password
				<input type="password" bind:value={confirm} />
			</label>
		</div>
		<div>
			<label>
				Email
				<input type="email" bind:value={email} />
			</label>
		</div>
		<div>
			<button>Register</button>
			<a href="/"><i>Cancel</i></a>
		</div>
	</form>
</main>
