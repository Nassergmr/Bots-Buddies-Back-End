import dotenv from "dotenv";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "mistral-ai/Codestral-2501";

let chatHistory = [{ role: "system", content: "You are a helpful assistant." }];

export async function Codestral(userMessage) {
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
        max_tokens: 1000,
        model: model,
      },
    });

    if (response.status === 413) {
      chatHistory = chatHistory.slice(-5);
      console.log("History reset successfully");
    }

    console.log("Codestral Response Status:", response.status);
  } catch (error) {
    console.log("Error With Codestral Api:", error);
    throw new Error("Error With Codestral Api Failed");
  }

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const aiResponse = response.body.choices[0].message.content;
  chatHistory.push({ role: "assistant", content: aiResponse });

  return aiResponse;
}
