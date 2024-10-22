<script lang="ts">
	import { getFieldErrors, isInvalid } from '$lib/utils/forms';

	let { form } = $props();
</script>

{#snippet formError(errors: string[] | null)}
	{#if errors}
		<small>
			{#each errors as error, index}
				{#if index > 0}<br />{/if}
				{error}
			{/each}
		</small>
	{/if}
{/snippet}

<article>
	<div class="grid">
		<hgroup>
			<h1>Log into Taskpal!</h1>
			<p>No account yet? <a href="/signup">Sign up</a></p>
		</hgroup>
		<form method="post">
			<input
				type="text"
				id="username"
				name="username"
				placeholder="Your username..."
				aria-invalid={isInvalid(form, 'username')}
				value={form?.values?.username ?? ''}
			/>
			{@render formError(getFieldErrors(form, 'username'))}

			<input
				type="password"
				id="password"
				name="password"
				placeholder="Your password..."
				aria-invalid={isInvalid(form, 'password')}
			/>
			{@render formError(getFieldErrors(form, 'password'))}

			<button> Log in </button>
		</form>
	</div>
</article>

<style>
	article {
		max-width: 40rem;
		margin: 0 auto;
		padding: calc(var(--pico-spacing) * 2);
	}

	hgroup {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0;
	}

	button {
		width: 100%;
	}
</style>
