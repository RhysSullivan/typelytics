import fs from "node:fs/promises";
import path from "node:path";
import { PostHogEventListResponse } from "./types";

const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY as string;
const project_id = process.env.POSTHOG_PROJECT_ID as string;

const url = `https://app.posthog.com/api/projects/${project_id}/event_definitions/`;

fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(async (data: PostHogEventListResponse) => {
    // console.log(data);
    // Handle the response data
    await generateTypeScriptFile(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("Error:", error);
  });

async function generateTypeScriptFile(data: PostHogEventListResponse) {
  const eventNames = data.results.map((event) => event.name);
  const typeScriptFileContent = `
  const events = ${JSON.stringify(eventNames, null, 2)};
  `;
  console.log(typeScriptFileContent);
  // write file to dist/events.ts
  const filePath = path.join(process.cwd(), "dist", "events.ts");
  await fs.writeFile(filePath, typeScriptFileContent, "utf-8");
}
