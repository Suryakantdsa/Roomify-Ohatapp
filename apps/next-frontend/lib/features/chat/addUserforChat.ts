import { create } from "zustand";
export type userBody = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};
export type roomBody = {
  id: number;
  isGroup: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
type body = userBody | roomBody | null;
interface addUserForChatInterface {
  user: any;
  isAddUserButtonClicked: boolean;
  toggleAddUserButton: () => void;
  setUserForChat: (data: body) => void;
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
