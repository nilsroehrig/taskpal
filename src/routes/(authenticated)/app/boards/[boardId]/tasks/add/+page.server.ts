import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { error, fail, redirect } from '@sveltejs/kit';
import omit from 'just-omit';

export const actions = {
	async default({ params, locals, request }) {
		const board = await locals.db.board.findFirst({
			where: {
				id: params.boardId
			}
		});

		if (!board) {
			error(404, 'Board not found');
		}

		const parseResult = zfd
			.formData(
				z.object({
					title: z.string().min(1).max(255),
					description: z.string().min(1).max(1000),
					status: z.enum(['todo', 'in-progress', 'done']),
					tags: z.string().min(1)
				})
			)
			.safeParse(await request.formData());

		if (!parseResult.success) {
			return fail(400, { errors: parseResult.error.format() });
		}

		await locals.db.task.create({
			data: {
				...omit(parseResult.data!, ['tags']),
				boardId: board.id,
				tags: {
					connectOrCreate: parseResult.data!.tags.split(',').map((tag: string) => ({
						where: { name: tag.trim() },
						create: { name: tag.trim(), color: 'sand' }
					}))
				}
			}
		});

		redirect(303, '/app/dashboard');
	}
};
