import { createServer } from "http";
import { config } from "dotenv";
import SocketServer from "./socket_server.js";

// Load .env variables
config();

const server = createServer();

// Pass server to your socket logic
SocketServer(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
