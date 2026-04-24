import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './handlers/database.js';
import { logger } from './utils/logger.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.DirectMessages,
  ],
});

// Colecciones
client.commands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();

// ========================
// CARGA DE COMANDOS
// ========================
async function loadCommands() {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(commandsPath);

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, folder, file);
      try {
        const command = await import(`file://${filePath}`);
        const cmd = command.default;
        
        if (cmd.data && cmd.execute) {
          client.commands.set(cmd.data.name, cmd);
          logger.info(`✅ Comando cargado: ${cmd.data.name}`);
        }
      } catch (error) {
        logger.error(`❌ Error cargando comando ${file}:`, error);
      }
    }
  }
}

// ========================
// CARGA DE EVENTOS
// ========================
async function loadEvents() {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    try {
      const event = await import(`file://${filePath}`);
      const evt = event.default;

      if (evt.name && evt.execute) {
        if (evt.once) {
          client.once(evt.name, (...args) => evt.execute(...args, client));
        } else {
          client.on(evt.name, (...args) => evt.execute(...args, client));
        }
        logger.info(`✅ Evento cargado: ${evt.name}`);
      }
    } catch (error) {
      logger.error(`❌ Error cargando evento ${file}:`, error);
    }
  }
}

// ========================
// REGISTRO DE COMANDOS SLASH
// ========================
async function registerSlashCommands() {
  const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    logger.info('🔄 Registrando comandos slash...');

    if (process.env.GUILD_ID) {
      // Desarrollo local
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      logger.info('✅ Comandos registrados en servidor de prueba');
    } else {
      // Global
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
      logger.info('✅ Comandos registrados globalmente');
    }
  } catch (error) {
    logger.error('❌ Error registrando comandos:', error);
  }
}

// ========================
// INICIO DEL BOT
// ========================
async function start() {
  try {
    logger.info('🚀 Inicializando bot...');

    // Inicializar base de datos
    initDatabase();
    logger.info('✅ Base de datos inicializada');

    // Cargar comandos y eventos
    await loadCommands();
    await loadEvents();
    await registerSlashCommands();

    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    logger.error('❌ Error al iniciar el bot:', error);
    process.exit(1);
  }
}

// Manejo de errores global
process.on('unhandledRejection', error => {
  logger.error('❌ Promesa rechazada no manejada:', error);
});

process.on('uncaughtException', error => {
  logger.error('❌ Excepción no capturada:', error);
  process.exit(1);
});

start();

export { client };