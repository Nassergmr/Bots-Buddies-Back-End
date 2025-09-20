import { createServer } from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import SocketServer from "./socket_server.js";

// Load .env variables
config();

// No logs or errors about rate limit from the server so had to track it manually using mongodb
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

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server terminated.");
    process.exit(0);
  });
});

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
