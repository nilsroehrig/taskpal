import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '$lib/server/hash';
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
			return fail(400, {
				errors: parseResult.error.format(),
				values: {
					username: formData.get('username')
				}
			});
		}

		const user = await locals.db.user.findFirst({
			where: {
				username: parseResult.data.username
			}
		});

		if (!user) {
			return fail(401, {
				errors: {
					username: { _errors: ['Unknown credentials'] }
				},
				values: {
					username: formData.get('username')
				}
			});
		}

		const isVerified = await verify(user.passwordHash, parseResult.data.password);

		if (!isVerified) {
			return fail(401, {
				errors: {
					password: { _errors: ['Unknown credentials'] }
				},
				values: {
					username: formData.get('username')
				}
			});
		}

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
