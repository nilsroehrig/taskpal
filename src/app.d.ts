// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { PrismaClient, Session, User } from '@prisma/client';
import type { Auth } from '$lib/server/auth';

declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals {
			db: PrismaClient;
			user: User | null;
			session: Session | null;
			auth: Auth;
		}
	}
}

export {};
