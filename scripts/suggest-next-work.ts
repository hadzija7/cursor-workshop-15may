import { Agent, CursorAgentError } from "@cursor/sdk";

const apiKey = process.env.CURSOR_API_KEY;

if (!apiKey) {
  console.error("Missing CURSOR_API_KEY. Create one in Cursor and export it first.");
  console.error("Example: export CURSOR_API_KEY=cursor_...");
  process.exit(1);
}

const prompt = `
You are helping prepare a 15-minute Cursor SDLC workshop.

Read TODO.md and docs/workshop-script.md in this repository. Suggest the single
best next improvement to demonstrate, with:

- the workshop moment it supports
- the files likely to change
- a two-minute verification plan

Do not edit files. Return a concise recommendation.
`;

async function main() {
  try {
    const result = await Agent.prompt(prompt, {
      apiKey,
      model: { id: "composer-2" },
      local: { cwd: process.cwd() },
    });

    if (result.status === "error") {
      console.error("Cursor agent run failed.");
      process.exit(2);
    }

    console.log(result.result);
  } catch (error) {
    if (error instanceof CursorAgentError) {
      console.error(
        `Cursor agent failed to start: ${error.message} retryable=${error.isRetryable}`,
      );
      process.exit(1);
    }

    throw error;
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
