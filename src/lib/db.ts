import Database from "better-sqlite3";

const db = new Database("data.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS status (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        text TEXT NOT NULL,
        updated_at INTEGER NOT NULL
    )
`);

export default db;