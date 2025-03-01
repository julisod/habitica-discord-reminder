import { CronJob } from "cron";
import { Client } from "discord.js";
import { sendReminderMessage } from "./utils/discordUtils.js";
import { getTaskById, getTasks } from "./utils/helpers.js";
import { checkIfDone } from "./utils/apiUtils.js";

export const createCronJobs = (client: Client) => {
  const tasks = getTasks();

  tasks.forEach((task) => {
    const job = new CronJob(
      task.cronExpression,
      async () => {
        try {
          const completed = await checkIfDone(task.taskId);
          if (!completed) {
            await sendReminderMessage(task.taskId, client);
          }
        } catch (error) {
          console.log(error);
        }
      },
      null,
      true, // start
    );
  });
};
