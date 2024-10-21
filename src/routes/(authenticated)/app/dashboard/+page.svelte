<script lang="ts">
	import type { Task } from '$lib/types/tasks';
	import Board from '$lib/components/task-board/Board.svelte';

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
</script>

<Board {tasks} title="Task Board" />
