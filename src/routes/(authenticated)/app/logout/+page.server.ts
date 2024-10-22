import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const actions = {
	default: async ({ locals, cookies }) => {
		await locals.auth.invalidateSession(locals.session!.id);
		cookies.delete(auth.sessionCookieName, { path: '/' });

		return redirect(302, '/login');
	}
};
