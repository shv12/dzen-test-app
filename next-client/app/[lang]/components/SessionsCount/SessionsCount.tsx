"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "@/shared/types/socket";

// 🌟 Inject types into the Client Socket instance
const url = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
  autoConnect: false // Connect manually inside useEffect
});

export default function SessionsCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      console.log("Connected to websocket");
    }

    const onDisconnect = () => {
      console.log("Disconnected from websocket");
    }

    const onReceiveMessage = ({ count }: { count: number }) => {
      console.log('SessionsCount :: receive-message :: count', count);
      setCount(count);
    }

    const onConnectError = (err: Error) => {
      console.error("❌ Ошибка подключения сокета:", err.message);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-message", onReceiveMessage);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-message", onReceiveMessage);
      socket.off("connect_error", onConnectError);

      socket.disconnect();
    };
  }, []);
  return <div>({count})</div>;
}