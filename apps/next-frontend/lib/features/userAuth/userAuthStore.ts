import { create } from "zustand";

interface userAuthStoreInterface {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const userAuthStore = create<userAuthStoreInterface>((set) => ({
  loading: true,
  setLoading: (value) => set({ loading: value }),
}));

export default userAuthStore;
