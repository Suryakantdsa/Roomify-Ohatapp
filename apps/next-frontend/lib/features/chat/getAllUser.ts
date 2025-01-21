import axios from "axios";
import { create } from "zustand";
interface Users {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

interface getallUserInterface {
  isgetallUserLoading: boolean;
  error: string | null;
  alluser: Users[] | null;
  fetchgetallUsersData: () => void;
}
const baseUrl = "http://localhost:8002/api/v1";
const getallUserStore = create<getallUserInterface>((set) => ({
  error: null,
  isgetallUserLoading: false,
  alluser: null,
  fetchgetallUsersData: async () => {
    const token = localStorage.getItem("accessToken");
    set({ isgetallUserLoading: true, alluser: null });
    try {
      const response = await axios.get(`${baseUrl}/all-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        alluser: response.data,
        isgetallUserLoading: false,
        error: null,
      });
      console.log(response.data);
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || error.message || "An error occurred",
        isgetallUserLoading: false,
      });
    }
  },
}));

export default getallUserStore;
