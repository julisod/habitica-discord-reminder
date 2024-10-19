import {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextChannel,
  Client,
  EmbedBuilder,
} from "discord.js";
import * as dotenv from "dotenv";
import { getTaskById } from "./helpers.js";

export const sendReminderMessage = async (taskId: string, client: Client) => {
  const doneButton = new ButtonBuilder()
    .setCustomId(`done-${taskId}`)
    .setLabel("Done")
    .setStyle(ButtonStyle.Success);

  const task = getTaskById(taskId);

  const embed = new EmbedBuilder()
    .setColor("#d4ae85")
    .setTitle(task.name)
    .setDescription(task.emoji);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(doneButton);

  dotenv.config();
  const { CHANNEL_ID } = process.env;
  if (!CHANNEL_ID) {
    throw new Error("Required environment variable CHANNEL_ID is not set");
  }

  await (client.channels.cache.get(CHANNEL_ID) as TextChannel).send({
    embeds: [embed],
    components: [row],
  });
};
