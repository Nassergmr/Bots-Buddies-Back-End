import { createServer } from "http";
import { config } from "dotenv";
import SocketServer from "./socket_server.js";

// Log if there any errors on production
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server terminated.");
    process.exit(0);
  });
});

// Load .env variables
config();

const PORT = process.env.PORT || 3001;
const server = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("OK");
  } else {
    res.writeHead(200);
    res.end("Running");
  }
});

console.log("ENV PORT:", PORT);
console.log("Starting server...");

// Pass server to the SocketServer function
try {
  SocketServer(server);
} catch (error) {
  console.error("SocketServer crashed:", error);
}

server.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
