<script lang="ts">
	import { Circle, CircleCheck, LoaderCircle } from 'lucide-svelte';

	type Tag = {
		id: string;
		name: string;
	};

	type Task = {
		id: string;
		title: string;
		description: string;
		status: string;
		tags: Tag[];
		updatedAt: Date;
	};

	let tasks: Task[] = $state([
		{
			id: '1',
			title: 'Wash Dishes',
			description: "The sink is full of last week's dishes. They need to be cleaned up.",
			status: 'todo',
			tags: [{ id: '1', name: 'Chores' }],
			updatedAt: new Date()
		},
		{
			id: '2',
			title: 'Start New Project',
			description: 'Need to start a new project for work.',
			status: 'todo',
			tags: [
				{ id: '2', name: 'Work' },
				{ id: '3', name: 'Project' }
			],
			updatedAt: new Date()
		},
		{
			id: '3',
			title: 'Write Blog Post',
			description: 'Need to write a blog post about the new project.',
			status: 'in-progress',
			tags: [{ id: '4', name: 'Writing' }],
			updatedAt: new Date()
		},
		{
			id: '4',
			title: 'Exercise',
			description: 'Need to exercise for the day.',
			status: 'in-progress',
			tags: [{ id: '5', name: 'Health' }],
			updatedAt: new Date()
		},
		{
			id: '5',
			title: 'Read Book',
			description: 'Need to read a book for the day.',
			status: 'in-progress',
			tags: [{ id: '6', name: 'Reading' }],
			updatedAt: new Date()
		},
		{
			id: '6',
			title: 'Buy Groceries',
			description:
				'Need to buy groceries for the week. This includes a lot, like tomatoes, gherkins, cheese, sausage, bread, coffee beans, frozen pizza and breakfast cereals. Remember to buy organic and local goods if available.',
			status: 'done',
			tags: [{ id: '7', name: 'Shopping' }],
			updatedAt: new Date()
		},
		{
			id: '7',
			title: 'Clean Room',
			description: 'Need to clean the room.',
			status: 'done',
			tags: [{ id: '1', name: 'Chores' }],
			updatedAt: new Date()
		}
	]);

	let sortedTasks = $derived(
		tasks.toSorted((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
	);
	let openTodos = $derived(sortedTasks.filter((task) => task.status === 'todo'));
	let inProgressTodos = $derived(sortedTasks.filter((task) => task.status === 'in-progress'));
	let doneTodos = $derived(sortedTasks.filter((task) => task.status === 'done'));

	function ondragstart(event: DragEvent) {
		event.dataTransfer!.setData('text/plain', event.target!.id);
	}

	function ondragover(event: DragEvent) {
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'move';
	}

	function ondrop(event: DragEvent) {
		event.preventDefault();
		const id = event.dataTransfer!.getData('text/plain');

		const task = tasks.find((task) => task.id === id);

		if (!task) return;

		task.status = event.currentTarget!.dataset.status!;
	}
</script>

{#snippet taskCard(task: Task)}
	<article class="card" id={task.id} draggable="true" {ondragstart}>
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
{/snippet}

<article class="board">
	<header class="board-header">
		<h1>Task Board</h1>
		<form role="search">
			<input name="filter" type="search" placeholder="Filter" />
		</form>
	</header>
	<div class="grid">
		<article class="status-column" data-status="todo" {ondragover} {ondrop}>
			<header>
				<strong role="heading" aria-level="2">To Do</strong>
			</header>

			{#each openTodos as task}
				{@render taskCard(task)}
			{/each}
		</article>
		<article class="status-column" data-status="in-progress" {ondragover} {ondrop}>
			<header>
				<strong role="heading" aria-level="2">In Progress</strong>
			</header>

			{#each inProgressTodos as task}
				{@render taskCard(task)}
			{/each}
		</article>
		<article class="status-column" data-status="done" {ondragover} {ondrop}>
			<header>
				<strong role="heading" aria-level="2">Done</strong>
			</header>

			{#each doneTodos as task}
				{@render taskCard(task)}
			{/each}
		</article>
	</div>
</article>

<style>
	.board {
		margin: calc(var(--pico-spacing) * 3) auto;
		max-width: calc(100% - var(--pico-spacing) * 6);

		header {
			display: grid;
			grid-template-columns: 2fr 1fr;
			align-items: center;

			> * {
				margin-bottom: 0;
			}
		}

		.grid > * {
			margin-bottom: 0;
		}
	}

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

	.status-column {
		background-color: var(--pico-background-color);

		> :last-child {
			margin-bottom: 0;
		}
	}
</style>
