// src/socket.js
// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // force websocket
  withCredentials: true,     // pour transmettre cookies/session
  autoConnect: false,        // on connectera manuellement
  pingTimeout: 60000,
  pingInterval: 25000
});

export default socket;