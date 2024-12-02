const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(require("cors")());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/activities", require("./routes/activities"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("message", ({ room, message }) => {
    io.to(room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
