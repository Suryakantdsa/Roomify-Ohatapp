import axios from "axios";
import { create } from "zustand";
interface bodyData {
  content: string;
  roomId?: number;
  reciverId?: number;
}

interface sendMessageInterface {
  isSendMessageLoading: boolean;
  error: string | null;
  sendMessages: any;
  fetchsendMessagesData: (data: bodyData) => void;
}
const baseUrl = "http://localhost:8000/api/v1";
const sendMessageStore = create<sendMessageInterface>((set) => ({
  error: null,
  isSendMessageLoading: false,
  sendMessages: null,
  fetchsendMessagesData: async (data) => {
    const token = localStorage.getItem("accessToken");
    set({ isSendMessageLoading: true });
    try {
      const response = await axios.post(`${baseUrl}/send-message`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        sendMessages: response.data,
        isSendMessageLoading: false,
        error: null,
      });
      console.log(response.data);
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isSendMessageLoading: false,
      });
    }
  },
}));

export default sendMessageStore;
