import { PermissionFlagsBits } from 'discord.js';
import { logger } from './logger.js';

export function hasPermission(member, permission) {
  if (!member) return false;
  return member.permissions.has(permission);
}

export function isAdmin(member) {
  return hasPermission(member, PermissionFlagsBits.Administrator) || member.id === process.env.BOT_OWNER_ID;
}

export function isModerator(member) {
  // Puedes personalizar esta lógica según tus necesidades
  return hasPermission(member, PermissionFlagsBits.ModerateMembers) || isAdmin(member);
}

export function checkPermissions(member, requiredPermission, commandName) {
  if (!hasPermission(member, requiredPermission)) {
    logger.warn(`${member.user.username} intentó usar ${commandName} sin permisos`);
    return false;
  }
  return true;
}