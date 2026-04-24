import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/database.db');

let db;

export function initDatabase() {
  try {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');

    // Tablas
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT,
        money INTEGER DEFAULT 0,
        warns INTEGER DEFAULT 0,
        last_interaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        description TEXT,
        emoji TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        total_price INTEGER,
        purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS giveaways (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        prize TEXT,
        winners_count INTEGER,
        end_time TIMESTAMP,
        message_id TEXT,
        channel_id TEXT,
        participants TEXT,
        winner_ids TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS votes (
        id TEXT PRIMARY KEY,
        question TEXT,
        options TEXT,
        user_votes TEXT,
        end_time TIMESTAMP,
        channel_id TEXT,
        message_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS scheduled_messages (
        id TEXT PRIMARY KEY,
        channel_id TEXT,
        message_content TEXT,
        embed_data TEXT,
        schedule_type TEXT,
        schedule_time TIMESTAMP,
        created_by TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS moderation_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        user_id TEXT,
        moderator_id TEXT,
        reason TEXT,
        duration TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    logger.success('Base de datos inicializada correctamente');
  } catch (error) {
    logger.error('Error inicializando base de datos:', error.message);
  }
}

export function getDatabase() {
  return db;
}

export function queryDatabase(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    return stmt.all(...params);
  } catch (error) {
    logger.error('Error en query:', error.message);
    return null;
  }
}

export function runDatabase(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    return stmt.run(...params);
  } catch (error) {
    logger.error('Error ejecutando:', error.message);
    return null;
  }
}