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
	<header>
		<strong role="heading" aria-level="2">Add Task</strong>
	</header>

	<form method="post">
		<div class="grid">
			<div>
				<label for="title">Title</label>
				<input type="text" name="title" id="title" aria-invalid={isInvalid(form, 'title')} />
				{@render formError(getFieldErrors(form, 'title'))}
			</div>
			<div>
				<label for="status">Status</label>
				<select name="status" aria-invalid={isInvalid(form, 'status')}>
					<option value="todo">To Do</option>
					<option value="in-progress">In Progress</option>
					<option value="done">Done</option>
				</select>
				{@render formError(getFieldErrors(form, 'status'))}
			</div>
		</div>
		<label for="description" aria-invalid={isInvalid(form, 'description')}>Description</label>
		<textarea name="description" rows="4"></textarea>
		{@render formError(getFieldErrors(form, 'description'))}
		<label for="tags">Tags</label>
		<input type="text" name="tags" aria-invalid={isInvalid(form, 'tags')} />
		{@render formError(getFieldErrors(form, 'tags'))}
		<div class="grid">
			<a href="/app/dashboard" class="secondary" role="button">Cancel</a>
			<button type="submit">Save Task</button>
		</div>
	</form>
</article>

<style>
	article {
		margin: var(--pico-spacing) auto;
		max-width: 30rem;

		> :last-child {
			margin-bottom: 0;
		}
	}

	button {
		margin: 0;
	}
</style>
