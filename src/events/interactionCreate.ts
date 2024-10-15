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
    const taskId = interaction.customId.slice(5);
    const response = await markAsDone(taskId);
    // todo: handle response
    /* if (response.success) {
      //reply with some info, then delete original message
      interaction.reply("yippe")
    } else {
      interaction.reply(response.message)
    } */
  }
};
