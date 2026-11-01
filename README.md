# Xaden.Ai

A responsive personal AI chat website with a private server-side API key.

## What you need
- Node.js 20 or newer
- An OpenAI API key with API billing/credits enabled

## Run it on your computer
1. Download and unzip this project.
2. Open the project folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Open `.env` and replace the placeholder with your API key:
   `OPENAI_API_KEY=your_real_key_here`
6. Run `npm start`.
7. Open `http://localhost:3000`.

Keep `.env` private. Never paste your API key into the website code, a public chat, or GitHub.

## Publish it online
This project needs a server because the API key must stay private. Deploy the whole folder to a Node.js host such as Render:
- Create a new Web Service and connect your GitHub repository.
- Build command: `npm install`
- Start command: `npm start`
- Add an environment variable named `OPENAI_API_KEY` with your secret key.
- Deploy. Your host will give you a public website URL.

A static-only host such as Netlify cannot run this Express server by itself. You can use Netlify for the frontend only if you also deploy the API server separately.

## Notes
- Chat messages are held in the current browser tab only; refreshing starts a new conversation.
- API usage may incur charges according to your OpenAI API account.
- The model is set to `gpt-6-luna` in `server.js`; change it to another model available to your API project if needed.
