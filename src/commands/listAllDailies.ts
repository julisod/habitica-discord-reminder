import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { fetchAllDailies } from "../utils/apiUtils.js";
import { EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("list_dailies")
  .setDescription(
    "[WIP] Get task id and name of all Habitica dailies, including the ones without reminders.",
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: true });
  try {
    const list = await fetchAllDailies();
    console.log(list);
    // Filter list to only have necessary information
    const filteredList = list.map((el: any) => ({ id: el._id, name: el.text }));
    // Format list into text
    let embedDescription = "";
    filteredList.forEach((el) => {
      embedDescription += `${el.name} \n ${el.id} \n\n`;
    });

    const listEmbed = new EmbedBuilder()
      .setTitle("Dailies")
      .setDescription(embedDescription);

    await interaction.followUp({ embeds: [listEmbed] });
  } catch (err) {
    console.error(err);
    await interaction.followUp("Woops, something went wrong :(");
  }
};
