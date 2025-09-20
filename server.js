import { createServer } from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import SocketServer from "./socket_server.js";

// Load .env variables
config();

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "my-db",
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Log if there any errors on production
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

const PORT = process.env.PORT || 3001;

// Create HTTP server with manual CORS
const server = createServer((req, res) => {
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://bots-buddies.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
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
