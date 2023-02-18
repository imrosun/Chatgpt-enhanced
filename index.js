const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
// add body parser and cors to express
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-tI9A4y76yZcIYPKfokNAxYAY",
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);



// create a simple express api that calls the function above 
const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {
  const { message, currentModel } = req.body;
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
        
        // model,
        // prompt,
        // temperature: 0.9,
        // max_tokens: 1000,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
      });    
      res.json({
        message: response.data.choices[0].text,
      })
});

app.get('/models', async (req, res) => {
  const response = await openai.listEngines();
  res.json({
    models: response.data.data
  })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
