import { type Handle, redirect } from '@sveltejs/kit';
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';
import { createAuth, sessionCookieName } from '$lib/server/auth';

const addPrisma: Handle = async ({ event, resolve }) => {
	const adapter = new PrismaD1(event.platform!.env.DB);
	const db = new PrismaClient({ adapter });
	event.locals.db = db;
	return resolve(event);
};

const addAuth: Handle = async ({ event, resolve }) => {
	const auth = createAuth(event.locals.db);
	event.locals.auth = auth;
	return resolve(event);
};

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await event.locals.auth.validateSession(sessionId);
	if (session) {
		event.cookies.set(sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expiresAt,
			secure: !dev
		});
	} else {
		event.cookies.delete(sessionCookieName, { path: '/' });
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const authenticatedPaths = new Set(['/app', '/api']);

const authorize: Handle = async ({ event, resolve }) => {
	for (const path of authenticatedPaths) {
		if (event.url.pathname.startsWith(path)) {
			if (!event.locals.user) {
				return redirect(302, '/login');
			}
		}
	}

	return resolve(event);
};

export const handle = sequence(addPrisma, addAuth, handleAuth, authorize);
