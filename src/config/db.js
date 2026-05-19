import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultdata = { books: [], readings: [], authors: [], users: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultdata);

await db.read();

export default db;