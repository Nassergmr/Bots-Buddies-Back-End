import dotenv from "dotenv";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "xai/grok-3-mini";

let requestCount = 0;
const requestsPerDay = 30;

let chatHistory = [{ role: "system", content: "You are a helpful assistant." }];

export async function XAi(userMessage) {
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

    console.log("xAi Response Status:", response.status);
    // console.log("xAi Response Body:", response.body);
  } catch (error) {
    console.log("Error With xAi Api:", error);
    throw new Error("Error With xAi Api Failed");
  }

  requestCount++;
  console.log(`Requests Remainning Today:`, requestsPerDay - requestCount);

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const choice = response.body.choices?.[0];
  const message = choice?.message;

  if (!message?.content) {
    throw new Error("xAi API did not return a message content.");
  }

  chatHistory.push({ role: "assistant", content: message.content });

  return message.content;
}
XAi("testing... respond with the word success ✅")
  .then(console.log)
  .catch(console.error);
