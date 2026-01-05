import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async function (event, context) {
    // 1. Method Validation
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    // 2. Input Validation
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
    }

    const { keyword } = body;

    if (!keyword || typeof keyword !== 'string' || keyword.trim() === "") {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Keyword is required" }),
        };
    }

    if (keyword.length > 50) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Keyword must be less than 50 characters" }),
        };
    }

    // 3. Environment Variable Check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("CRITICAL: GEMINI_API_KEY is not set in environment variables.");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Configuration Error" }),
        };
    }

    try {
        // 4. Gemini API Call
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const prompt = `Analyze the current market sentiment and public opinion for the keyword '${keyword}'. You act as a professional market analyst.
Return ONLY a raw JSON object (no markdown formatting) with the following structure:
{
  "score": number (0 to 100, where 0 is Extreme Fear, 50 is Neutral, 100 is Extreme Greed),
  "status": string (e.g., "Extreme Fear", "Caution", "Greed"),
  "summary": string[] (Array of 3 short sentences explaining why you gave this score based on recent trends),
  "related_keywords": string[] (3-4 related trending tags)
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present (Gemini sometimes adds ```json ... ```)
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const analysisData = JSON.parse(text);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(analysisData),
        };

    } catch (error) {
        // 5. Secure Error Handling
        console.error(`API Call Failed for keyword '${keyword}':`, error);

        // Return generic error to client
        // Return actual error for debugging
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Debug Error: ${error.message || error.toString()}` }),
        };
    }
};
