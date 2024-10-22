export async function DELETE({ params, locals }) {
	const { id } = params;

	await locals.db.task.delete({
		where: {
			id
		}
	});

	return new Response(null, { status: 204 });
}
