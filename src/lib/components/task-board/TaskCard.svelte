<script lang="ts">
	import { Circle, CircleCheck, LoaderCircle } from 'lucide-svelte';
	import type { Task } from '$lib/types/tasks';
	import type { HTMLAttributes } from 'svelte/elements';

	type TaskCardProps = HTMLAttributes<HTMLElement> & {
		task: Task;
	};

	let { task, ...restProps }: TaskCardProps = $props();
</script>

<article class="card" id={task.id} draggable="true" {...restProps}>
	<header>
		<strong role="heading" aria-level="3">{task.title}</strong>
		{#if task.status === 'todo'}
			<Circle />
		{:else if task.status === 'in-progress'}
			<LoaderCircle class="pico-color-blue" />
		{:else}
			<CircleCheck class="pico-color-green" />
		{/if}
	</header>
	<p>{task.description}</p>
	<ul class="inline-list">
		{#each task.tags as tag}
			<li class="badge badge-small pico-background-sand">{tag.name}</li>
		{/each}
	</ul>
</article>

<style>
	.inline-list {
		display: flex;
		flex-wrap: wrap;
		gap: calc(var(--pico-spacing) / 2);
		padding: 0;

		li {
			list-style: none;
			margin: 0;
		}
	}

	.badge {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	.badge-small {
		padding: 0.125rem 0.25rem;
		font-size: smaller;
	}

	.card {
		font-size: smaller;

		> :last-child {
			margin-bottom: 0;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		p {
			height: 2lh;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}
</style>
