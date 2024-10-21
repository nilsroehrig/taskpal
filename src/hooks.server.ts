import type { Handle } from '@sveltejs/kit';
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { sequence } from '@sveltejs/kit/hooks';

const addPrisma: Handle = async ({ event, resolve }) => {
	const adapter = new PrismaD1(event.platform!.env.DB);
	const db = new PrismaClient({ adapter });
	event.locals.db = db;
	return resolve(event);
};

export const handle = sequence(addPrisma);
