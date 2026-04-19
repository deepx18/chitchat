// server.js
import express  from "express"
import http  from "http"
import { Server }  from "socket.io"
import cors  from "cors"

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // in prod → your frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // join room (chat room or private user channel)
  socket.on("join", (room) => {
    socket.join(room);
  });

  // receive message
  socket.on("send_message", (data) => {
    console.log("Message:", data);

    // send to room
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("WebSocket server running on port 3000");
});