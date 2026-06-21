# Prompt Party

A playful, responsive AI usage dashboard prototype. It tracks prompts, tokens, estimated cost, time saved, monthly budget, and usage by assistant.

The dashboard is personalized for Codex, Claude, and Gemini.

Open `index.html` in a browser. No build step or dependencies are required.

## Publish with GitHub Pages

Push the repository to the `main` branch on GitHub. The included Pages workflow publishes the dashboard automatically. In the repository's **Settings > Pages**, select **GitHub Actions** as the source if it is not already selected.

The dashboard currently uses sample data. Use **Log usage** to add prompts during the session; connect the data objects in `app.js` to provider APIs or a local database for persistent, real usage data.
