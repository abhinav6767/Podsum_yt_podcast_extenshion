const openai = require("openai");

// Set your OpenAI API key
openai.apiKey = "";

// Define the prompt for the text generation
const prompt = "Once upon a time";

// Define the parameters for the text generation
const parameters = {
  engine: "text-davinci-002",
  prompt: prompt,
  maxTokens: 100,
  temperature: 0.5,
  n: 1,
  stop: "\n",
};

export default async function generate() {
  openai.completions
    .create(parameters)
    .then((response) => {
      console.log(response.choices[0].text);
    })
    .catch((error) => {
      console.error(error);
    });
}
// Call the OpenAI API to generate text
