// src/server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// Разрешаем CORS для вашего Next.js фронтенда
app.use(cors({
  origin: "http://localhost:3000"
}));

const httpServer = createServer(app);

// Инициализируем Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Простой эндпоинт для проверки работы сервера через браузер
app.get('/', (req, res) => {
  res.send('Socket server is running smoothly!');
});

let count = 0;

// Обработка подключений клиентов
io.on('connection', (socket) => {
    console.log(`🚀 Client connected: ${socket.id}`);
  count += 1;
  io.emit("receive-message", { count });

  // Обработка отключения клиента
  socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      count -= 1;
    socket.broadcast.emit('receive-message', { count });
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`⚡ [server]: Server is running at http://localhost:${PORT}`);
});