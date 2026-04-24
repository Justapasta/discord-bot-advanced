import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const timestamp = () => new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' });

export const logger = {
  info: (message) => {
    const log = `[${timestamp()}] ℹ️  ${message}`;
    console.log(`\x1b[36m${log}\x1b[0m`);
    fs.appendFileSync(path.join(logDir, 'bot.log'), `${log}\n`);
  },

  error: (message, error = '') => {
    const log = `[${timestamp()}] ❌ ${message} ${error}`;
    console.error(`\x1b[31m${log}\x1b[0m`);
    fs.appendFileSync(path.join(logDir, 'error.log'), `${log}\n`);
  },

  warn: (message) => {
    const log = `[${timestamp()}] ⚠️  ${message}`;
    console.warn(`\x1b[33m${log}\x1b[0m`);
    fs.appendFileSync(path.join(logDir, 'bot.log'), `${log}\n`);
  },

  success: (message) => {
    const log = `[${timestamp()}] ✅ ${message}`;
    console.log(`\x1b[32m${log}\x1b[0m`);
    fs.appendFileSync(path.join(logDir, 'bot.log'), `${log}\n`);
  },

  debug: (message) => {
    const log = `[${timestamp()}] 🐛 ${message}`;
    console.log(`\x1b[35m${log}\x1b[0m`);
  },
};