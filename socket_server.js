import { Server } from "socket.io";
import { Chatgpt } from "./models/chatGpt.js";
import { Meta } from "./models/meta.js";
import { Microsoft } from "./models/microsoft.js";
import { XAi } from "./models/xai.js";
import { Core42 } from "./models/core42.js";
import { Codestral } from "./models/codestral.js";
import { checkAndIncrementLimit } from "./utils/checkRateLimit.js";

// Register a WebSocket server
export default async function SocketServer(server) {
  // Creating a new Socket.IO server instance and attaching it to the provided HTTP server
  const io = new Server(server, {
    cors: {
      origin: "https://bots-buddies-v2.vercel.app",
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
        140,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Chatgpt(userMessage);
        console.log("ChatGPT user message:", userMessage);
        socket.emit("chatgpt_conversation", mssg);
        console.log("Remaining ChatGPT requests:", remaining);
        socket.emit("chatgpt_mssg_generated");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("ChatGPT Error:", error);
      }
    });

    socket.on("chatgpt_conversation_2", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "chatgpt",
        140,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Chatgpt(userMessage);
        console.log("ChatGPT user message:", userMessage);
        socket.emit("chatgpt_conversation_2", mssg);
        console.log("Remaining ChatGPT requests:", remaining);
        socket.emit("chatgpt_mssg_generated_2");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("ChatGPT Error:", error);
      }
    });

    // Meta
    socket.on("meta_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit("meta", 45);

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Meta(userMessage);
        console.log("Meta user message:", userMessage);
        socket.emit("meta_conversation", mssg);
        console.log("Remaining Meta requests:", remaining);
        socket.emit("meta_mssg_generated");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Meta Error:", error);
      }
    });

    socket.on("meta_conversation_2", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit("meta", 45);

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Meta(userMessage);
        console.log("Meta user message:", userMessage);
        socket.emit("meta_conversation_2", mssg);
        console.log("Remaining Meta requests:", remaining);
        socket.emit("meta_mssg_generated_2");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Meta Error:", error);
      }
    });

    // Microsoft
    socket.on("microsoft_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "microsoft",
        140,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Microsoft(userMessage);
        console.log("Microsoft user message:", userMessage);
        socket.emit("microsoft_conversation", mssg);
        console.log("Remaining Microsoft requests:", remaining);
        socket.emit("microsoft_mssg_generated");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Microsoft Error:", error);
      }
    });

    socket.on("microsoft_conversation_2", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "microsoft",
        140,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Microsoft(userMessage);
        console.log("Microsoft user message:", userMessage);
        socket.emit("microsoft_conversation_2", mssg);
        console.log("Remaining Microsoft requests:", remaining);
        socket.emit("microsoft_mssg_generated_2");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Microsoft Error:", error);
      }
    });

    // XAi
    socket.on("xai_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit("xai", 25);

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await XAi(userMessage);
        console.log("xAi user message:", userMessage);
        socket.emit("xai_conversation", mssg);
        console.log("Remaining xAi requests:", remaining);
        socket.emit("xai_mssg_generated");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("xAi Error:", error);
      }
    });

    socket.on("xai_conversation_2", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit("xai", 25);

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await XAi(userMessage);
        console.log("xAi user message:", userMessage);
        socket.emit("xai_conversation_2", mssg);
        console.log("Remaining xAi requests:", remaining);
        socket.emit("xai_mssg_generated_2");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("xAi Error:", error);
      }
    });

    // Core42
    socket.on("core42_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "core42",
        145,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Core42(userMessage);
        console.log("Core42 user message:", userMessage);
        socket.emit("core42_conversation", mssg);
        console.log("Remaining Core42 requests:", remaining);
        socket.emit("core42_mssg_generated");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Core42 Error:", error);
      }
    });

    // Codestral
    socket.on("codestral_conversation", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "codestral",
        145,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Codestral(userMessage);
        console.log("codestral user message:", userMessage);
        socket.emit("codestral_conversation", mssg);
        console.log("Remaining codestral requests:", remaining);
        socket.emit("codestral_mssg_generated");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Codestral Error:", error);
      }
    });

    socket.on("codestral_conversation_2", async (userMessage) => {
      const { allowed, remaining } = await checkAndIncrementLimit(
        "codestral",
        145,
      );

      if (!allowed) {
        socket.emit("rate_limit_exceeded");
        return;
      }

      try {
        const mssg = await Codestral(userMessage);
        console.log("codestral user message:", userMessage);
        socket.emit("codestral_conversation_2", mssg);
        console.log("Remaining codestral requests:", remaining);
        socket.emit("codestral_mssg_generated_2");
      } catch (error) {
        socket.emit("error", "Something went wrong, try again");
        console.error("Codestral Error:", error);
      }
    });
  });
}
