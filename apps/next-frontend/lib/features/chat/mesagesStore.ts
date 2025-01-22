import axios from "axios";
import { create } from "zustand";
import { roomBody } from "./addUserforChat";

export interface Datum {
  id: number;
  content: string;
  senderId: number;
  roomId: number;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender: Sender;
}

export interface Sender {
  id: number;
  name: string;
  avatar: string;
}

export interface MessageData {
  total: number;
  skip: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  data: { messages: Datum[]; room: roomBody };
}
interface messageInterface {
  isMessageLoading: boolean;
  error: string | null;
  messages: MessageData | null;
  setMessages: (daata: any) => void;
  fetchMessagesData: (id: number) => void;
}
const baseUrl = "http://localhost:8002/api/v1";
const messageStore = create<messageInterface>((set) => ({
  error: null,
  isMessageLoading: false,
  messages: null,
  setMessages: (data) => set({ messages: data }),
  fetchMessagesData: async (id) => {
    const token = localStorage.getItem("accessToken");
    set({ isMessageLoading: true });
    try {
      const response = await axios.get(`${baseUrl}/chat-messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ messages: response.data, isMessageLoading: false, error: null });
      console.log(response.data);
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isMessageLoading: false,
      });
    }
  },
}));

export default messageStore;
