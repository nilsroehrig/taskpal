import pick from 'just-pick';

export async function load({ locals }) {
	const board = await locals.db.board.findFirst({
		include: {
			tasks: {
				include: {
					tags: true
				}
			}
		}
	});

	if (!board) {
		return {
			board: null
		};
	}

	let result = {
		board: {
			id: board.id,
			title: board.title,
			tasks: board.tasks.map((task) => ({
				...pick(task, ['id', 'title', 'description', 'status', 'modifiedAt']),
				tags: task.tags.map((tag) => pick(tag, ['id', 'name', 'color']))
			}))
		}
	};

	return result;
}
