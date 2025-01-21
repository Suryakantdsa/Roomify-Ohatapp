import axios from "axios";
import { create } from "zustand";

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
  data: Datum[];
}
interface messageInterface {
  isMessageLoading: boolean;
  error: string | null;
  messages: MessageData | null;
  resetMessage: () => void;
  fetchMessagesData: (id: number) => void;
}
const baseUrl = "http://localhost:8002/api/v1";
const messageStore = create<messageInterface>((set) => ({
  error: null,
  isMessageLoading: false,
  messages: null,
  resetMessage: () => set({ messages: null }),
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
