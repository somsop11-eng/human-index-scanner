# Human Index Scanner (인간 지표 판독기)

AI-powered market sentiment analyzer. Enter a keyword, and it scans the "Fear & Greed" index of the market.

## Setup

1.  **Clone & Install**
    ```bash
    npm install
    ```

2.  **Environment Variables (Crucial!)**
    -   Create a `.env` file in the root for local development:
        ```env
        GEMINI_API_KEY=your_gemini_api_key_here
        ```
    -   **For Netlify Deployment:** Go to **Site Settings > Environment variables** and add `GEMINI_API_KEY`.

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    *Note: To test serverless functions locally, you might need `netlify-cli` (`npm i -g netlify-cli` then `netlify dev`).*

4.  **Build**
    ```bash
    npm run build
    ```

## Tech Stack
-   **Frontend:** React (Vite), Tailwind CSS (Neon Dark Theme)
-   **Backend:** Netlify Functions (Node.js)
-   **AI:** Google Gemini API

## Security & Architecture
-   API Key is never exposed to the client (Server-side call only).
-   Input validation (length limit, empty check) applied.
-   Generic error messages for client security.
