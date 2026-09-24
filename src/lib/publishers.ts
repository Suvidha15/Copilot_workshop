import { asc, eq } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Database } from './db';
import type { Publisher } from '../types/game';

/** Return all publishers in alphabetical name order for filters and list views. */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db.select().from(publishers).orderBy(asc(publishers.name));
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}

/** Return a single publisher by id, or null when no matching publisher exists. */
export async function getPublisherById(db: Database, id: number): Promise<Publisher | null> {
    const row = await db.select().from(publishers).where(eq(publishers.id, id)).get();
    return row ? { id: row.id, name: row.name } : null;
}
