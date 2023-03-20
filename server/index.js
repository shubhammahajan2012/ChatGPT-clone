require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// Create an Express app and a router
const app = express();
const router = express.Router();

// Set the port to listen on
const port = process.env.PORT || 4000;

// Create an OpenAI configuration object using the API key stored in the environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

// Set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(router);

// Define a route that handles POST requests to /message
router.post('/message', async (req, res) => {
  // Extract the message from the request body
  const { message } = req.body;

  // Create a new OpenAI API object using the configuration object
  const openai = new OpenAIApi(configuration);

   // Use the API to generate a response to the message
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message,
    max_tokens: 100,
    temperature: 0.9
  });

// Send the generated response back to the client
  res.json({
    message: response.data.choices[0].text
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
