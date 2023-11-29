import express from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new SocketIoServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on("chat message", (message, room) => {
    console.log("Message: ", message, " Room: ", room);

    io.to(room).emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
