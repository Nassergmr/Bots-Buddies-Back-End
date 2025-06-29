import { Server } from "socket.io";
import { Chatgpt } from "./models/chatGpt.js";
import { Meta } from "./models/meta.js";
import { Microsoft } from "./models/microsoft.js";
import { XAi } from "./models/xai.js";
import { Core42 } from "./models/core42.js";
import { checkAndIncrementLimit } from "./utils/checkRateLimit.js";

// Register a WebSocket server
export default async function SocketServer(server) {
  // Creating a new Socket.IO server instance and attaching it to the provided HTTP server
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Listening for new client connections
  io.on("connection", async (socket) => {
    console.log(`Connected Successfully from Server Side : ${socket.id}`);

    // ChatGPT
    socket.on("chatgpt_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "chatgpt",
        47
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Chatgpt(userMessage);
        socket.emit("chatgpt_conversation", mssg);
        console.log("ChatGPT user message:", userMessage);
        console.log("Remaining ChatGPT requests:", remaining);
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("ChatGPT Error:", error);
      }
    });

    // Meta
    socket.on("meta_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit("meta", 147);

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Meta(userMessage);
        socket.emit("meta_conversation", mssg);
        console.log("Meta user message:", userMessage);
        console.log("Remaining Meta requests:", remaining);
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Meta Error:", error);
      }
    });

    // Microsoft
    socket.on("microsoft_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "microsoft",
        147
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Microsoft(userMessage);
        socket.emit("microsoft_conversation", mssg);
        console.log("Microsoft user message:", userMessage);
        console.log("Remaining Microsoft requests:", remaining);
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Microsoft Error:", error);
      }
    });

    // XAi
    socket.on("xai_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit("xai", 27);

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await XAi(userMessage);
        socket.emit("xai_conversation", mssg);
        console.log("xAi user message:", userMessage);
        console.log("Remaining xAi requests:", remaining);
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("xAi Error:", error);
      }
    });

    // Core42
    socket.on("core42_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "core42",
        147
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Core42(userMessage);
        socket.emit("core42_conversation", mssg);
        console.log("Core42 user message:", userMessage);
        console.log("Remaining Core42 requests:", remaining);
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Core42 Error:", error);
      }
    });
  });
}
