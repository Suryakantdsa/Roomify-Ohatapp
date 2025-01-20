import { create } from "zustand";
import { SignUp_POST } from "@repo/zod/src/userSchema";
interface signUpInterface extends SignUp_POST {
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setAvatar: (value: string) => void;
}

const useSignUpStore = create<signUpInterface>((set) => ({
  name: "",
  email: "",
  password: "",
  avatar: "",
  setName: (value) => set(() => ({ name: value })),
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setAvatar: (value) => set({ avatar: value }),
}));

export default useSignUpStore;
