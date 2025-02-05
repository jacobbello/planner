import {db} from './drizzle'
import * as schema from './schema'
import {seed} from 'drizzle-seed'

async function main() {
    await seed(db, schema).refine((f) => ({
        users: {
            count: 5,
            with: {
                notes: 10,
                events: 5,
                todo: 5
            }
        }
    }));
}

main();