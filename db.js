import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
const dbPath = process.env.DATABASE_PATH || './data/editorverse.sqlite';
fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });
export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', creator TEXT NOT NULL DEFAULT 'Community Creator', file_name TEXT, file_url TEXT, mime_type TEXT, size_bytes INTEGER, downloads INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE, username TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE(resource_id, username));
CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE, username TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
`);
if (db.prepare('SELECT COUNT(*) AS count FROM resources').get().count === 0) {
 const insert = db.prepare('INSERT INTO resources (title, category, description, creator) VALUES (?, ?, ?, ?)');
 const samples = [
 ['Midnight City B-Roll','Raw Videos','Moody urban clips for cinematic edits.','PV17 Studio'],
 ['Chrome Type Pack','Fonts','Bold metallic typography inspiration for titles.','MotionLab'],
 ['Impact & Whoosh SFX','Sound Effects','A starter collection of punchy transition sounds.','AudioForge'],
 ['Blue Hour LUT','LUTs / Presets','A cool blue cinematic color grade preset concept.','PV17 Studio'],
 ['Minimal Creator PNGs','PNG Packs','Clean overlays and cutout elements for thumbnails.','PixelDepot'],
 ['Color Grading Basics','Tutorials','Learn contrast, white balance, and color separation.','EditorVerse']
 ];
 db.transaction(() => samples.forEach(row => insert.run(...row)))();
}
