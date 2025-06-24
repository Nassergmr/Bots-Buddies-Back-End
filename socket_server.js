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

  // Listening for new client connections
  io.on("connection", async (socket) => {
    console.log(`Connected Successfully from Server Side, id: ${socket.id}`);

    // ChatGpt
    socket.on("chatgpt_conversation", async (userMessage) => {
      console.log("​🧒​ user message to chatgpt:", userMessage);
      try {
        // Send Client Message To Chatgpt
        const mssg = await Chatgpt(userMessage);

        // Send Chatgpt Response To The Client
        socket.emit("chatgpt_conversation", mssg);
      } catch (error) {
        console.error("Error:", error.status, error);

        if (error.status === 429) {
          // Notify the client about the rate limit error
          socket.emit("rate_limit_exceeded", {
            retryAfter: error.headers?.["retry-after"],
          });
        } else {
          socket.emit("error", {
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    });

    // Meta
    socket.on("meta_conversation", async (userMessage) => {
      console.log("​🧒​ user message to Meta:", userMessage);
      try {
        // Send Client Message To Meta
        const mssg = await Meta(userMessage);

        // Send Meta Response To The Client
        socket.emit("meta_conversation", mssg);
      } catch (error) {
        console.error("Error:", error.status, error);
        if (error.status === 429) {
          // Notify the client about the rate limit error
          socket.emit("rate_limit_exceeded", {
            retryAfter: error.headers?.["retry-after"],
          });
        } else {
          socket.emit("error", {
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    });

    // Microsoft
    socket.on("microsoft_conversation", async (userMessage) => {
      console.log("​🧒​ user message to Microsoft:", userMessage);
      try {
        // Send Client Message To Microsoft
        const mssg = await Microsoft(userMessage);

        // Send Microsoft Response To The Client
        socket.emit("microsoft_conversation", mssg);
      } catch (error) {
        console.error("Error:", error.status, error);
        if (error.status === 429) {
          // Notify the client about the rate limit error
          socket.emit("rate_limit_exceeded", {
            retryAfter: error.headers?.["retry-after"],
          });
        } else {
          socket.emit("error", {
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    });

    // xAi
    socket.on("xai_conversation", async (userMessage) => {
      console.log("​🧒​ user message to XAi:", userMessage);
      try {
        // Send Client Message To XAi
        const mssg = await XAi(userMessage);
        console.log("Xai Response In Client Side:", mssg);
        // Send XAi Response To The Client
        socket.emit("xai_conversation", mssg);
      } catch (error) {
        console.error("Error:", error.status, error);
        if (error.status === 429) {
          // Notify the client about the rate limit error
          socket.emit("rate_limit_exceeded", {
            retryAfter: error.headers?.["retry-after"],
          });
        } else {
          socket.emit("error", {
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    });

    // Core42
    socket.on("core42_conversation", async (userMessage) => {
      console.log("​🧒​ user message to Core42:", userMessage);
      try {
        // Send Client Message To Core42
        const mssg = await Core42(userMessage);
        console.log("Core42 Response In Client Side:", mssg);
        // Send Core42 Response To The Client
        socket.emit("core42_conversation", mssg);
      } catch (error) {
        console.error("Error:", error.status, error);
        if (error.status === 429) {
          // Notify the client about the rate limit error
          socket.emit("rate_limit_exceeded", {
            retryAfter: error.headers?.["retry-after"],
          });
        } else {
          socket.emit("error", {
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    });
  });
}
