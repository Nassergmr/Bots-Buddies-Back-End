import { Server } from "socket.io";
import { Chatgpt } from "./bots/chatGpt.js";
import { Meta } from "./bots/meta.js";
import { Microsoft } from "./bots/microsoft.js";
import { XAi } from "./bots/xai.js";
import { Core42 } from "./bots/core42.js";

// Register a WebSocket server
export default async function SocketServer(server) {
  // Creating a new Socket.IO server instance and attaching it to the provided HTTP server
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // No logs or errors about rate limit from the server so had to track it manually
  let ChatGPTRequestCount = 0;
  let ChatGPTRequestsPerDay = 50;

  let MetaRequestCount = 0;
  let MetaRequestsPerDay = 50;

  let MicrosoftRequestCount = 0;
  let MicrosoftRequestsPerDay = 150;

  let XAiRequestCount = 0;
  let XAiRequestsPerDay = 30;

  let Core42RequestCount = 0;
  let Core42RequestsPerDay = 150;

  // reset counter every 24h
  setInterval(() => {
    ChatGPTRequestCount = 0;
    MetaRequestCount = 0;
    MicrosoftRequestCount = 0;
    XAiRequestCount = 0;
    Core42RequestCount = 0;
  }, 24 * 60 * 60 * 1000);

  // Listening for new client connections
  io.on("connection", async (socket) => {
    console.log(`Connected Successfully from Server Side : ${socket.id}`);

    // ChatGPT
    socket.on("chatgpt_conversation", async (userMessage) => {
      const remaining = ChatGPTRequestsPerDay - ChatGPTRequestCount;

      if (remaining <= 2) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      ChatGPTRequestCount++;

      console.log(" ChatGPT user message:", userMessage);
      console.log("Remaining ChatGPT requests:", remaining - 1);

      try {
        const mssg = await Chatgpt(userMessage);
        socket.emit("chatgpt_conversation", mssg);
      } catch (error) {
        console.error("ChatGPT Error:", error);
        socket.emit("error", { message: "Unexpected error. Try again later." });
      }
    });

    // Meta
    socket.on("meta_conversation", async (userMessage) => {
      const remaining = MetaRequestsPerDay - MetaRequestCount;

      if (remaining <= 2) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      MetaRequestCount++;
      console.log("Meta user message:", userMessage);
      console.log("Remaining Meta requests:", remaining - 1);

      try {
        const mssg = await Meta(userMessage);
        socket.emit("meta_conversation", mssg);
      } catch (error) {
        console.error("Meta Error:", error);
        socket.emit("error", { message: "Unexpected error. Try again later." });
      }
    });

    // Microsoft
    socket.on("microsoft_conversation", async (userMessage) => {
      const remaining = MicrosoftRequestsPerDay - MicrosoftRequestCount;

      if (remaining <= 2) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      MicrosoftRequestCount++;
      console.log("Microsoft user message:", userMessage);
      console.log("Remaining Microsoft requests:", remaining - 1);

      try {
        const mssg = await Microsoft(userMessage);
        socket.emit("microsoft_conversation", mssg);
      } catch (error) {
        console.error("Microsoft Error:", error);
        socket.emit("error", { message: "Unexpected error. Try again later." });
      }
    });

    // XAi
    socket.on("xai_conversation", async (userMessage) => {
      const remaining = XAiRequestsPerDay - XAiRequestCount;

      if (remaining <= 2) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      XAiRequestCount++;
      console.log(" XAi user message:", userMessage);
      console.log("Remaining XAi requests:", remaining - 1);

      try {
        const mssg = await XAi(userMessage);
        socket.emit("xai_conversation", mssg);
      } catch (error) {
        console.error("XAi Error:", error);
        socket.emit("error", { message: "Unexpected error. Try again later." });
      }
    });

    // Core42
    socket.on("core42_conversation", async (userMessage) => {
      const remaining = Core42RequestsPerDay - Core42RequestCount;

      if (remaining <= 2) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      Core42RequestCount++;
      console.log("Core42 user message:", userMessage);
      console.log("Remaining Core42 requests:", remaining - 1);

      try {
        const mssg = await Core42(userMessage);
        socket.emit("core42_conversation", mssg);
      } catch (error) {
        console.error("Core42 Error:", error);
        socket.emit("error", { message: "Unexpected error. Try again later." });
      }
    });
  });
}
