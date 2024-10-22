<script lang="ts">
	import { flip } from 'svelte/animate';
	import { send, receive } from '$lib/utils/animation';
	import TaskCard from '$lib/components/task-board/TaskCard.svelte';
	import type { Task } from '$lib/types/tasks';
	import StatusColumn from '$lib/components/task-board/StatusColumn.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type BoardProps = HTMLAttributes<HTMLElement> & {
		title?: string;
		tasks: Task[];
	};

	let { tasks, title = 'Task Board', ...restProps }: BoardProps = $props();

	let filterText = $state('');

	let filteredTasks = $derived(
		tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(filterText.toLowerCase()) ||
				task.description.toLowerCase().includes(filterText.toLowerCase())
		)
	);

	let sortedTasks = $derived(
		filteredTasks.toSorted((a, b) => a.modifiedAt.getTime() - b.modifiedAt.getTime())
	);

	let openTodos = $derived(sortedTasks.filter((task) => task.status === 'todo'));
	let inProgressTodos = $derived(sortedTasks.filter((task) => task.status === 'in-progress'));
	let doneTodos = $derived(sortedTasks.filter((task) => task.status === 'done'));

	function ondragstart(event: DragEvent) {
		event.dataTransfer!.setData('text/plain', event.target!.id);
	}

	function ondragover(event: DragEvent) {
		console.log('dragover');
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'move';
	}

	async function ondrop(event: DragEvent) {
		event.preventDefault();
		const id = event.dataTransfer!.getData('text/plain');

		const task = tasks.find((task) => task.id === id);

		if (!task) return;

		const originalStatus = task.status;
		const originalModifiedAt = task.modifiedAt;

		task.status = event.currentTarget!.dataset.status!;
		task.modifiedAt = new Date();

		await fetch(`/api/tasks/${task.id}/set-status`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: task.status
			})
		}).then(
			(response) => {
				if (!response.ok) {
					task.status = originalStatus;
					task.modifiedAt = originalModifiedAt;
				}
			},
			() => {
				task.status = originalStatus;
				task.modifiedAt = originalModifiedAt;
			}
		);
	}
</script>

<article class="board" {...restProps}>
	<header class="board-header">
		<h1>{title}</h1>
		<form role="search">
			<input name="filter" type="search" placeholder="Filter" bind:value={filterText} />
		</form>
	</header>
	<div class="grid">
		<StatusColumn status="todo" {ondragover} {ondrop}>
			{#each openTodos as task (task.id)}
				<div animate:flip in:send={{ key: task.id }} out:receive={{ key: task.id }}>
					<TaskCard draggable="true" {task} {ondragstart} />
				</div>
			{/each}
		</StatusColumn>
		<StatusColumn status="in-progress" {ondragover} {ondrop}>
			{#each inProgressTodos as task (task.id)}
				<div animate:flip in:send={{ key: task.id }} out:receive={{ key: task.id }}>
					<TaskCard draggable="true" {task} {ondragstart} />
				</div>
			{/each}
		</StatusColumn>
		<StatusColumn status="done" {ondragover} {ondrop}>
			{#each doneTodos as task (task.id)}
				<div animate:flip in:send={{ key: task.id }} out:receive={{ key: task.id }}>
					<TaskCard draggable="true" {task} {ondragstart} />
				</div>
			{/each}
		</StatusColumn>
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
</style>
