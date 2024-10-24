import { error } from '@sveltejs/kit';
import omit from 'just-omit';

export async function GET({ locals }) {
	const items = [
		{
			title: 'Wash Dishes',
			description: "The sink is full of last week's dishes. They need to be cleaned up.",
			tags: ['Chores'],
			status: 'todo'
		},
		{
			title: 'Start New Project',
			description: 'Need to start a new project for work.',
			tags: ['Work', 'Project'],
			status: 'todo'
		},
		{
			title: 'Write Blog Post',
			description: 'Need to write a blog post about the new project.',
			tags: ['Writing'],
			status: 'in-progress'
		},
		{
			title: 'Exercise',
			description: 'Need to exercise for the day.',
			tags: ['Health'],
			status: 'in-progress'
		},
		{
			title: 'Read Book',
			description: 'Need to read a book for the day.',
			tags: ['Reading'],
			status: 'in-progress'
		},
		{
			title: 'Buy Groceries',
			description:
				'Need to buy groceries for the week. This includes a lot, like tomatoes, gherkins, cheese, sausage, bread, coffee beans, frozen pizza and breakfast cereals. Remember to buy organic and local goods if available.',
			tags: ['Shopping'],
			status: 'done'
		},
		{
			title: 'Clean Room',
			description: 'Need to clean the room.',
			tags: ['Chores'],
			status: 'done'
		}
	];

	const boardTitle = 'Task Board';

	const existingBoard = await locals.db.board.findFirst({
		where: {
			title: boardTitle
		}
	});

	if (existingBoard) {
		error(500, { message: 'Board already exists' });
	}

	await locals.db.board.create({
		data: {
			title: boardTitle,
			tasks: {
				create: items.map((item) => {
					return {
						...omit(item, 'tags'),
						tags: {
							connectOrCreate: item.tags.map((tag) => ({
								where: { name: tag.trim() },
								create: { name: tag.trim(), color: 'sand' }
							}))
						}
					};
				})
			}
		}
	});

	return new Response('Seed data created', { status: 200 });
}
