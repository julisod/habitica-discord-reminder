import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const getTasks = (): Task[] => {
  // Find file path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const tasksPath = path.join(__dirname, "..", "..", "data", "tasks.json");

  // Read the file
  const taskData = fs.readFileSync(tasksPath, "utf-8");
  return JSON.parse(taskData);
};

export const getTaskById = (taskId: string) => {
  const tasks = getTasks();

  const found = tasks.find((el) => el.taskId === taskId);

  if (!found) {
    throw new Error("No task found with the given ID");
  }
  return found;
};
