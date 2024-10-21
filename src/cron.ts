import { CronJob } from "cron";
import { Client } from "discord.js";
import { sendReminderMessage } from "./utils/discordUtils.js";
import { getTasks } from "./utils/helpers.js";

export const createCronJobs = (client: Client) => {
  const tasks = getTasks();

  tasks.forEach((task) => {
    const job = new CronJob(
      task.cronExpression,
      () => sendReminderMessage(task.taskId, client),
      null,
      true, // start
    );
  });
};
