import * as dotenv from "dotenv";
import { Client, GatewayIntentBits, Routes, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Command } from "./discord.js";
import { createCronJobs } from "./cron.js";

dotenv.config();
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
if (!BOT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error(
    "Required environment variables BOT_TOKEN, CLIENT_ID, or GUILD_ID are not set",
  );
}

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Gathering slash commands
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandFoldersPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandFoldersPath)
  .filter((file: string) => file.endsWith(".js"));

client.commands = new Collection();
let commandArray: Command[] = [];

// It would make sense for this to be async, but it works better without it for some reason
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
    commandArray.push(command.data.toJSON());
  } else {
    console.log(
      `The command is missing a required "data" or "execute" property.`,
    );
  }
}

// Event handling
// You could also use event enums instead of strings
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Refreshing guild commands
(async () => {
  try {
    const data: any = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commandArray },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
})();

client.login(BOT_TOKEN);

createCronJobs(client);
