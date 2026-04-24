# 🤖 Advanced Discord Bot v2.0

Bot de Discord avanzado, profesional y 100% modular construido con **Node.js** y **discord.js v14**.

## ✨ Características Principales

### 📢 Sistema de Anuncios
- Crear anuncios profesionales con embeds personalizados
- Confirmar antes de enviar
- Menciones personalizadas (@everyone, @here, roles específicos)
- Imágenes y colores personalizables

### 🗳️ Sistema de Votaciones/Encuestas
- Crear encuestas con 2-10 opciones
- Votación con botones
- Contador en tiempo real
- Resultados automáticos al finalizar

### 🎁 Sistema de Sorteos (Giveaway)
- Crear sorteos atractivos
- Participación con un clic
- Selección automática de ganadores
- Notificaciones por DM
- Requisitos de rol personalizables

### 🛍️ Sistema de Tienda
- Catálogo visual de productos
- Compra con confirmación
- Sistema de moneda/puntos
- Historial de compras
- Carrito de compras

### 📬 Mensajes Programados
- Programar mensajes para fechas específicas
- Mensajes recurrentes (diarios, semanales, mensuales)
- Editor visual de embeds
- Gestión de mensajes programados

### ⚙️ Sistema de Moderación
- Comandos: `/ban`, `/kick`, `/mute`, `/unmute`, `/warn`
- Anti-spam automático
- Logs detallados en canal de staff
- Sistema de infracciones por usuario
- Apelaciones con modal

### 📊 Sistema de Logs Completo
- Logs de mensajes eliminados/editados
- Logs de entrada/salida de usuarios
- Cambios de roles
- Acciones de moderación
- Errores del bot

### 🎨 Utilidades Auxiliares
- `/embed` - Crear embeds personalizados
- `/clear` - Limpiar mensajes
- `/say` - El bot envía un mensaje
- `/ping` - Latencia del bot
- `/info` - Información del servidor/usuario
- `/help` - Menú de ayuda interactivo

---

## 🚀 Instalación Rápida

### Requisitos Previos
- **Node.js** v18 o superior
- **npm** o **yarn**
- Bot de Discord creado en [Discord Developer Portal](https://discord.com/developers)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/discord-bot-advanced.git
   cd discord-bot-advanced
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` y añade:
   ```env
   DISCORD_TOKEN=tu_token_aqui
   CLIENT_ID=tu_client_id
   GUILD_ID=tu_guild_id (opcional, para desarrollo)
   LOG_CHANNEL_ID=id_canal_logs
   BOT_OWNER_ID=tu_id_usuario
   ```

4. **Ejecutar el bot**
   ```bash
   npm start
   ```
   
   O para desarrollo con auto-reload:
   ```bash
   npm run dev
   ```

---

## 📁 Estructura del Proyecto

```
discord-bot-advanced/
├── index.js                    # Punto de entrada
├── package.json               # Dependencias
├── config.json                # Configuración
├── .env.example               # Variables de ejemplo
├── README.md                  # Esta documentación
├── handlers/
│   ├── database.js           # Gestión de SQLite
│   └── errorHandler.js       # Manejo de errores
├── commands/
│   ├── announcements/
│   │   └── anuncio.js
│   ├── giveaways/
│   │   ├── sorteo.js
│   │   └── cancelar-sorteo.js
│   ├── voting/
│   │   ├── votacion.js
│   │   └── cancelar-votacion.js
│   ├── shop/
│   │   ├── tienda.js
│   │   ├── producto.js
│   │   └── historial.js
│   ├── scheduling/
│   │   └── mensaje-eventual.js
│   ├── moderation/
│   │   ├── ban.js
│   │   ├── kick.js
│   │   ├── mute.js
│   │   ├── unmute.js
│   │   └── warn.js
│   ├── utilities/
│   │   ├── embed.js
│   │   ├── clear.js
│   │   ├── say.js
│   │   ├── ping.js
│   │   └── info.js
│   └── admin/
│       └── setup.js
├── events/
│   ├── ready.js
│   ├── interactionCreate.js
│   ├── messageDelete.js
│   ├── messageUpdate.js
│   ├── guildMemberAdd.js
│   ├── guildMemberRemove.js
│   └── error.js
├── utils/
│   ├── logger.js              # Sistema de logging
│   ├── embeds.js              # Plantillas de embeds
│   ├── permissions.js         # Control de permisos
│   └── constants.js           # Constantes
├── models/
│   ├── user.js
│   ├── product.js
│   ├── giveaway.js
│   └── vote.js
├── data/
│   └── database.db            # Base de datos SQLite
└── logs/
    ├── bot.log
    └── error.log
```

---

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
# Token del bot
DISCORD_TOKEN=tu_token_botMjk4d2F5d3dkd...

# Client ID
CLIENT_ID=1234567890123456789

# Server ID (solo para pruebas, opcional)
GUILD_ID=1234567890123456789

# Canales
LOG_CHANNEL_ID=1234567890123456789
SHOP_CHANNEL_ID=1234567890123456789
GIVEAWAY_CHANNEL_ID=1234567890123456789

# Owner
BOT_OWNER_ID=tu_usuario_id

# Base de datos
DATABASE_PATH=./data/database.db
```

### config.json

Personaliza colores, prefijo y configuraciones globales en `config.json`

---

## 🎮 Uso de Comandos

### Anuncios
```
/anuncio titulo:"Bienvenida" descripcion:"Descripción..." imagen:URL color:#5865F2
```

### Votaciones
```
/votacion pregunta:"¿Te gusta el bot?" opciones:"Si,No,Quizás" duracion:24
```

### Sorteos
```
/sorteo premio:"Nitro" ganadores:2 minutos:60 rol_requerido:@Miembro
```

### Tienda
```
/tienda                    # Ver productos
/producto add nombre:Item precio:100 descripción:"..."
```

### Moderación
```
/ban usuario:@Alguien razon:"Spam" dias:7
/kick usuario:@Alguien razon:"Violación de reglas"
/mute usuario:@Alguien tiempo:1h razon:"Spam"
/warn usuario:@Alguien razon:"Advertencia"
```

### Utilidades
```
/ping                      # Latencia del bot
/info                      # Info del servidor
/help                      # Menú de ayuda
/clear cantidad:10         # Limpiar mensajes
```

---

## 🗄️ Base de Datos

El bot usa **SQLite** (better-sqlite3) para almacenar:
- Datos de usuarios (dinero, warns, etc.)
- Productos de la tienda
- Historial de compras
- Información de sorteos
- Logs de votaciones
- Registros de moderación

La base de datos se crea automáticamente en `data/database.db`

---

## 📊 Sistemas Implementados

### ✅ Completado
- [x] Anuncios profesionales
- [x] Sistema de votaciones
- [x] Sorteos con selección automática
- [x] Tienda de productos
- [x] Sistema de moderación básico
- [x] Logging completo
- [x] Manejo de errores
- [x] Comandos slash modernos

### 🚧 En Desarrollo
- [ ] Mensajes programados avanzados
- [ ] Sistema de tickets
- [ ] Reacciones de roles
- [ ] Niveles y experiencia

---

## 🔧 Troubleshooting

### El bot no se conecta
```
❌ Error: DISCORD_TOKEN no está configurado
✅ Solución: Verifica que .env tenga DISCORD_TOKEN válido
```

### Comandos no aparecen
```
❌ Error: Los comandos slash no aparecen
✅ Solución: 
   1. Verifica CLIENT_ID en .env
   2. Espera 5 minutos para sincronización global
   3. Prueba con GUILD_ID para desarrollo local
```

### Base de datos corrupta
```
❌ Error: database disk image malformed
✅ Solución: Elimina data/database.db y reinicia
```

### Permisos insuficientes
```
❌ Error: Missing Permissions
✅ Solución: Verifica que el bot tenga permisos necesarios en el servidor
```

---

## 🛡️ Seguridad

- ✅ Variables de entorno protegidas
- ✅ Validación de entrada en todos los comandos
- ✅ Verificación de permisos
- ✅ Rate limiting automático
- ✅ Logs detallados de acciones
- ✅ Manejo seguro de tokens

---

## 📝 Licencia

MIT - Libre para usar, modificar y distribuir

---

## 💬 Soporte

¿Problemas o sugerencias?
- Abre un [Issue](https://github.com/tuusuario/discord-bot-advanced/issues)
- Revisa la [Documentación](https://discord.js.org/)
- Contacta con el equipo

---

## 🎯 Roadmap

- [ ] Sistema de tickets mejorado
- [ ] Dashboard web
- [ ] Integración con APIs externas
- [ ] Sistema de música
- [ ] Comandos personalizados por servidor
- [ ] Soporte para bases de datos MySQL/PostgreSQL

---

**Hecho con ❤️ para la comunidad de Discord**