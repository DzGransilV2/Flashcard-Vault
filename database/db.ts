// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabaseAsync('flashcards.db');

// export const createTables = async () => {
//     try {
//         const sqliteDB = await db; // Wait for the promise to resolve
//         await sqliteDB.execAsync(`
//             PRAGMA journal_mode = WAL;
//             CREATE TABLE IF NOT EXISTS flashcards (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 question TEXT NOT NULL,
//                 answer TEXT NOT NULL,
//                 keywords TEXT NOT NULL,
//                 category_id INTEGER,
//                 answer_status_id INTEGER,
//                 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
//                 FOREIGN KEY (answer_status_id) REFERENCES answer_status(id) ON DELETE SET NULL
//             );

//             CREATE TABLE IF NOT EXISTS categories (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 category_name TEXT NOT NULL,
//                 category_image TEXT NOT NULL,
//                 card_id INTEGER
//             );

//             CREATE TABLE IF NOT EXISTS answer_status (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 status TEXT NOT NULL,
//                 correct TEXT NOT NULL,
//                 card_id INTEGER
//             );
//         `);
//     } catch (error) {
//         console.error('Error creating tables:', error);
//     }
// };

// export default db;