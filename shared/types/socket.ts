// types/socket.ts

// Events emitted from Server -> Client
export interface ServerToClientEvents {
  "receive-message": (data: { count: number }) => void;
  "user-joined": (username: string) => void;
}

// Events emitted from Client -> Server
export interface ClientToServerEvents {
  "send-message": (data: { user: string; text: string }) => void;
  "join-room": (username: string) => void;
}

// Internal server-to-server events (optional)
export interface InterServerEvents {
  ping: () => void;
}

// Socket data properties (optional custom state)
export interface SocketData {
  username: string;
}