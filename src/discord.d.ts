import { ChatInputCommandInteraction, Collection } from "discord.js";

interface Command {
  data: {
    name: string;
    description: string;
  };
  execute: (interaction: ChatInputCommandInteraction) => any;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
