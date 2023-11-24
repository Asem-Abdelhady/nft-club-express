import express from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);

// Allow requests from any origin
app.use(cors());

const io = new SocketIoServer(server, {
  cors: {
    origin: "*", // Allow any origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message: string) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
