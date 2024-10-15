import * as dotenv from "dotenv";

dotenv.config();
const { HABITICA_CLIENT, HABITICA_USER_ID, HABITICA_API_TOKEN } = process.env;
if (!HABITICA_CLIENT || !HABITICA_USER_ID || !HABITICA_API_TOKEN) {
  throw new Error(
    "Required environment variables HABITICA_CLIENT, HABITICA_USER_ID, or HABITICA_API_TOKEN are not set",
  );
}

const headers = {
  "x-client": HABITICA_CLIENT,
  "x-api-user": HABITICA_USER_ID,
  "x-api-key": HABITICA_API_TOKEN,
};

export const markAsDone = async (taskId: string) => {
  return fetch(`https://habitica.com/api/v3/tasks/${taskId}/score/up`, {
    method: "POST",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};

export const checkIfDone = async (taskId: string): Promise<boolean> => {
  return fetch(`https://habitica.com/api/v3/tasks/${taskId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    })
    .then((data) => data.data.completed);
};
