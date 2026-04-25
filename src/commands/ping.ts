import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Anyone home?");

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply("🏓");
};
