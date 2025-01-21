import axios from "axios";
import { create } from "zustand";

interface ChartData {
  id: number;
  sendId?: number;
  reciverId?: number;
  isGroup: boolean;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: Date;
}
interface inboxStoreInterface {
  isInboxLoading: boolean;
  chatData: ChartData[] | null;
  error: string | null;
  fetchInboxData: (baseUrl: string) => void;
}

const inboxStore = create<inboxStoreInterface>((set) => ({
  isInboxLoading: false,
  chatData: null,
  error: null,

  fetchInboxData: async (baseUrl) => {
    set({ isInboxLoading: true });
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`${baseUrl}/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ chatData: response.data, isInboxLoading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, isInboxLoading: false });
    }
  },
}));

export default inboxStore;
