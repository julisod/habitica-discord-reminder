import { Client } from "discord.js";

export const once = true;

export const name = "ready";

export const execute = async (readyClient: Client<true>) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
};
