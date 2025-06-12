require("dotenv").config();
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post("/template", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const systemPrompt = getSystemPrompt();

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            {
                text: `${systemPrompt}\n\nReturn either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra.\n\n${prompt}`
            }
        ]);

        const answer = result.response.text().trim().toLowerCase(); 
        console.log("Gemini type response:", typeof(answer));
        console.log("Gemini raw response:", answer);
        
        
        console.log("phase 1");
        
        if (answer.includes("react")) {
            res.json({
                prompts: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (answer.includes("node")) {
            res.json({
                prompts: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(202).json({ message: "Invalid response from Gemini API. Access denied." });

    } catch (error:any) {
        console.error("Error in /template:", error);
        res.status(500).json({ message: "Internal Server Error in /template", error: error.message });
    }
});

app.post("/chat", async (req, res) => {
    try {
        const chatMessages = req.body.messages.map((msg: any) => ({
            role: msg.role == "assistant" ? "model" : msg.role,
            parts: [{ text: msg.content }]
        }));

        const systemPrompt = getSystemPrompt();

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                ...chatMessages
            ]
        });

        const result = await chat.sendMessage(
                "Respond with helpful information based on the above. Do NOT use backticks or markdown formatting. Return raw code as plain text."
        );
        let rawText = result.response.text();
        const cleanedText = rawText.replace(/```(tsx)?\n?/g, "").trim();

        console.log("Result in chat section is:", cleanedText);

        res.json({
            response: cleanedText
        });
    } catch (error:any) {
        console.error("Error in /chat:", error);
        res.status(500).json({ message: "Internal Server Error in /chat", error: error.message });
    }
});

app.get(["/", "/api"], (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (e) {
    console.log("erorrrrr", e);
  }
});

app.use(
  cors({
    origin: "https://autocodex.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  })
);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
