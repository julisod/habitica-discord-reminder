import { Interaction } from "discord.js";
import { markAsDone } from "../utils/apiUtils.js";

export const name = "interactionCreate";

export const execute = async (interaction: Interaction) => {
  // Slash commands
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }

    // Buttons
  } else if (interaction.isButton()) {
    if (interaction.customId.slice(0, 4) !== "done") return;
    await interaction.deferReply({ ephemeral: true });
    const taskId = interaction.customId.slice(5);

    try {
      await markAsDone(taskId);
      await interaction.followUp("Yippee");
      // Deleting the reminder after the task is completed
      await interaction.message.delete();
    } catch (error: any) {
      await interaction.followUp(`${error.name}: ${error.message}`);
    }
  }
};
