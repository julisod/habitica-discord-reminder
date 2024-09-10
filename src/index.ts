import * as dotenv from "dotenv";
import { Client, GatewayIntentBits, Routes, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Command } from "./discord.js";

dotenv.config();
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
if (!BOT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error(
    "Required environment variables BOT_TOKEN, CLIENT_ID, or GUILD_ID are not set",
  );
}

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// readyClient is same as client, but just assumes client is true (for types)
// You could also use event enums instead of strings
client.once("ready", (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

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
