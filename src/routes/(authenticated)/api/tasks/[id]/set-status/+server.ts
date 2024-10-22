import { z } from 'zod';

export async function PATCH({ request, locals, params }) {
	const { id } = params;
	const { status } = z
		.object({
			status: z.enum(['todo', 'in-progress', 'done'])
		})
		.parse(await request.json());

	const task = await locals.db.task.findUnique({
		where: { id }
	});

	if (!task) {
		return new Response('Task not found', { status: 404 });
	}

	await locals.db.task.update({
		where: { id },
		data: {
			status
		}
	});

	return new Response(null, { status: 204 });
}
