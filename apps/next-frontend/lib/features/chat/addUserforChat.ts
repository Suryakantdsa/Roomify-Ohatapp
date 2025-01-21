import { create } from "zustand";
interface bodyData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

interface addUserForChatInterface {
  user: bodyData | null;
  isAddUserButtonClicked: boolean;
  toggleAddUserButton: () => void;
  setUserForChat: (data: bodyData) => void;
}

const addUserForChatStore = create<addUserForChatInterface>((set) => ({
  user: null,
  isAddUserButtonClicked: true,
  toggleAddUserButton: () =>
    set((state) => ({ isAddUserButtonClicked: !state.isAddUserButtonClicked })),
  setUserForChat: (data) => {
    set({ user: data });
  },
}));

export default addUserForChatStore;
