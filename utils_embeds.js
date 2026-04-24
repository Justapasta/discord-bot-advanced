import { EmbedBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

export const createEmbed = (options = {}) => {
  const embed = new EmbedBuilder()
    .setColor(options.color || process.env.BOT_COLOR || '#5865F2')
    .setTimestamp();

  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.image) embed.setImage(options.image);
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.author) embed.setAuthor(options.author);
  if (options.footer) embed.setFooter({ text: options.footer, iconURL: options.footerIcon });
  if (options.fields) {
    options.fields.forEach(field => {
      embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
    });
  }

  return embed;
};

export const errorEmbed = (message) => {
  return createEmbed({
    title: '❌ Error',
    description: message,
    color: '#FF0000',
  });
};

export const successEmbed = (title, description) => {
  return createEmbed({
    title: `✅ ${title}`,
    description,
    color: '#57F287',
  });
};

export const infoEmbed = (title, description) => {
  return createEmbed({
    title: `ℹ️ ${title}`,
    description,
    color: '#00A8FF',
  });
};

export const warningEmbed = (message) => {
  return createEmbed({
    title: '⚠️ Advertencia',
    description: message,
    color: '#FFA500',
  });
};