import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// readyClient is same as client, but just assumes client is true
// You could also use event enums instead of strings
client.once("ready", (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.BOT_TOKEN);
