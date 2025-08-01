import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connect from "./connectToDB.js";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  // console.log("A user connected");

  socket.on("join", (username) => {
    socket.username = username;
    io.emit("message", {
      type: "system",
      content: `${username} joined the chat`,
      timestamp: new Date(),
    });
  });

  socket.on("message", (message) => {
    io.emit("message", {
      type: "user",
      content: message,
      username: socket.username,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("message", {
        type: "system",
        content: `${socket.username} left the chat`,
        timestamp: new Date(),
      });
    }
  });
});

connect().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
