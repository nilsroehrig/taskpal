import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { PrismaClient, type Session } from '@prisma/client';
import omit from 'just-omit';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function createAuth(db: PrismaClient) {
	function generateSessionToken(): string {
		const bytes = crypto.getRandomValues(new Uint8Array(20));
		const token = encodeBase32LowerCaseNoPadding(bytes);
		return token;
	}

	async function createSession(userId: string): Promise<Session> {
		const token = generateSessionToken();
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
		const session: Session = {
			id: sessionId,
			userId,
			expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
		};

		await db.session.create({ data: session });

		return session;
	}

	async function invalidateSession(sessionId: string): Promise<void> {
		await db.session.delete({ where: { id: sessionId } });
	}

	async function validateSession(sessionId: string) {
		const session = await db.session
			.findUnique({
				where: { id: sessionId },
				include: { user: true }
			})
			.catch(() => {
				return null;
			});

		if (!session) {
			return { session: null, user: null };
		}

		const sessionExpired = Date.now() >= session.expiresAt.getTime();
		if (!session.user || sessionExpired) {
			await db.session.delete({ where: { id: session.id } });
			return { session: null, user: null };
		}

		const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
		if (renewSession) {
			session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
			await db.session.update({
				where: { id: session.id },
				data: { expiresAt: session.expiresAt }
			});
		}

		return {
			session: omit(session, 'user'),
			user: session.user
		};
	}

	return { createSession, invalidateSession, validateSession };
}

export type SessionValidationResult = Awaited<
	ReturnType<ReturnType<typeof createAuth>['validateSession']>
>;

export type Auth = ReturnType<typeof createAuth>;

/** Cheat Sheet:

 cookies.set(auth.sessionCookieName, session.id, {
	path: '/',
	sameSite: 'lax',
	httpOnly: true,
	expires: session.expiresAt,
	secure: !dev
});

 */
