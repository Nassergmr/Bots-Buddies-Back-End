import dotenv from "dotenv";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

let chatHistory = [{ role: "system", content: "You are a helpful assistant." }];

export async function Chatgpt(userMessage) {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));
  chatHistory.push({ role: "user", content: userMessage });

  // Keep Only The Last 20 Messages In Memory
  if (chatHistory.length > 20) {
    chatHistory = chatHistory.slice(-20);
  }

  let response;
  try {
    response = await client.path("/chat/completions").post({
      body: {
        messages: chatHistory,
        temperature: 1.0,
        top_p: 1.0,
        model: model,
      },
    });

    console.log("Chatgpt Response Status:", response.status);
  } catch (error) {
    console.log("Error With Chatgpt Api:", error);
    throw new Error("Error With Chatgpt Api Failed");
  }

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const choice = response.body.choices?.[0];
  const message = choice?.message;

  if (!message?.content) {
    throw new Error("ChatGPT API did not return a message content.");
  }

  chatHistory.push({ role: "assistant", content: message.content });

  return message.content;
}
Chatgpt("testing... respond with the word success ✅")
  .then(console.log)
  .catch(console.error);
