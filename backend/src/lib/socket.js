import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// ✅ Store multiple socket connections per user
const userSocketMap = {}; // { userId: [socketId1, socketId2] }

// ✅ Get all active sockets of a user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId] || [];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id); // ✅ Allow multiple connections per user
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    // ✅ Remove disconnected socket
    Object.keys(userSocketMap).forEach((key) => {
      userSocketMap[key] = userSocketMap[key].filter((id) => id !== socket.id);
      if (userSocketMap[key].length === 0) {
        delete userSocketMap[key]; // ✅ Remove user if no sockets remain
      }
    });

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
