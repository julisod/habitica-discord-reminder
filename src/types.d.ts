interface CronTask {
  taskId: string;
  name: string;
  emoji: string;
  cronExpression: string;
}

interface Daily {
  _id: string;
  text: string;
}
