import { Configuration, OpenAIApi } from "openai";
import dotenv  from "dotenv";
import * as readline from 'readline';

dotenv.config();

// Set up the OpenAI API client with your API key and org ID
const configuration = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
  while (true) {
    // Prompt the user for input
    const input = await new Promise<string>((resolve) => {
        rl.question('Ask OpenAI a question (or type "exit" to quit): ', (answer) => {
          resolve(answer);
        });
      });
  
    // Check if the user wants to exit
    if (input === 'exit') {
      break;
    }

    console.log('Thinking...');
    console.log(input);

    // Send the input to the OpenAI API
    const response = await openai.createCompletion({
      model: "davinci",
      prompt: input,

    });

    console.log(response.data.choices[0].text);

  }

    rl.close();
}

// Call the main function to start the program
main();
