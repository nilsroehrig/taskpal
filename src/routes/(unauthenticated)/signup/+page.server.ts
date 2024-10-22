import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { hash } from '$lib/server/hash';
import * as auth from '$lib/server/auth';
import { dev } from '$app/environment';

export const actions = {
	async default({ locals, request, cookies }) {
		const formData = await request.formData();
		const parseResult = zfd
			.formData(
				z.object({
					username: z.string().min(3).max(64),
					password: z.string().min(6).max(64)
				})
			)
			.safeParse(formData);

		if (!parseResult.success) {
			const formattedErrors = parseResult.error.format();

			console.log(formattedErrors);

			return fail(400, {
				errors: parseResult.error.format(),
				values: {
					username: formData.get('username')
				}
			});
		}

		const user = await locals.db.user.create({
			data: {
				username: parseResult.data.username,
				passwordHash: await hash(parseResult.data.password)
			}
		});

		const session = await locals.auth.createSession(user.id);
		cookies.set(auth.sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expiresAt,
			secure: !dev
		});

		redirect(303, '/app/dashboard');
	}
};
