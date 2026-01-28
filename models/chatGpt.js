import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-mini";
// const model = "openai/gpt-4o-mini";

let chatHistory = [{ role: "system", content: "You are a helpful assistant." }];

export async function Chatgpt(userMessage) {
  console.log(userMessage);

  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  chatHistory.push({ role: "user", content: userMessage });

  // Keep Only The Last 10 Messages In Memory
  if (chatHistory.length > 10) {
    chatHistory = chatHistory.slice(-10);
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

    if (response.status === 413) {
      chatHistory = chatHistory.slice(-5);
      console.log("History reset successfully");
    }

    console.log("Gpt Response Status:", response.status);
  } catch (error) {
    console.log("Error With Meta Api:", error);
    throw new Error("Error With Meta Api Failed");
  }

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const aiResponse = response.body.choices[0].message.content;
  chatHistory.push({ role: "assistant", content: aiResponse });

  return aiResponse;
}
