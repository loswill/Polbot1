const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai'); // Import OpenAI
const path = require('path');

const app = express();
const PORT = 3001; // Use a different port if needed

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

// OpenAI API configuration
const openai = new OpenAI({
    apiKey: "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", // Replace with your actual API key
});

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o", // or another model you're using
            messages: [
                { role: "system", content: "You are a right-leaning chatbot that responds in the first person. Your name is Carlos" },
                { role: "user", content: userMessage }
            ],
        });

        res.json({ message: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing the request.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
