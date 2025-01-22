import { create } from "zustand";

interface socketInterface {
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
}

const socketStore = create<socketInterface>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket: socket }),
}));

export default socketStore;
