<script lang="ts">
	import { flip } from 'svelte/animate';
	import { send, receive } from '$lib/utils/animation';
	import TaskCard from '$lib/components/task-board/TaskCard.svelte';
	import type { Task } from '$lib/types/tasks';

	let filterText = $state('');

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

	let filteredTasks = $derived(
		tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(filterText.toLowerCase()) ||
				task.description.toLowerCase().includes(filterText.toLowerCase())
		)
	);
	let sortedTasks = $derived(
		filteredTasks.toSorted((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
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
		task.updatedAt = new Date();
	}
</script>

<article class="board">
	<header class="board-header">
		<h1>Task Board</h1>
		<form role="search">
			<input name="filter" type="search" placeholder="Filter" bind:value={filterText} />
		</form>
	</header>
	<div class="grid">
		<article class="status-column" data-status="todo" {ondragover} {ondrop}>
			<header>
				<strong role="heading" aria-level="2">To Do</strong>
			</header>

			{#each openTodos as task (task.id)}
				<div animate:flip in:send={{ key: task.id }} out:receive={{ key: task.id }}>
					<TaskCard draggable="true" {task} {ondragstart} />
				</div>
			{/each}
		</article>
		<article class="status-column" data-status="in-progress" {ondragover} {ondrop}>
			<header>
				<strong role="heading" aria-level="2">In Progress</strong>
			</header>

			{#each inProgressTodos as task (task.id)}
				<div animate:flip in:send={{ key: task.id }} out:receive={{ key: task.id }}>
					<TaskCard draggable="true" {task} {ondragstart} />
				</div>
			{/each}
		</article>
		<article class="status-column" data-status="done" {ondragover} {ondrop}>
			<header>
				<strong role="heading" aria-level="2">Done</strong>
			</header>

			{#each doneTodos as task (task.id)}
				<div animate:flip in:send={{ key: task.id }} out:receive={{ key: task.id }}>
					<TaskCard draggable="true" {task} {ondragstart} />
				</div>
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

	.status-column {
		background-color: var(--pico-background-color);

		> :last-child {
			margin-bottom: 0;
		}
	}
</style>
