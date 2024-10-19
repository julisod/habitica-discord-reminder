import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const getTaskById = (taskId: string) => {
  // Load tasks from the file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const tasksPath = path.join(__dirname, "..", "..", "data", "tasks.json");

  const taskData = fs.readFileSync(tasksPath, "utf-8");
  const tasks: Task[] = JSON.parse(taskData);

  // Loop through to find the correct task
  const found = tasks.find((el) => el.taskId === taskId);

  if (!found) {
    throw new Error("No task found with the given ID");
  }
  return found;
};
