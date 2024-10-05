import { create } from "zustand";
import { User } from "../interface";

interface AccountStore {
  credentials: User | null;
  setCredentials: (credentials: User | null) => void;
  clearCredentials: () => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  credentials: null,
  setCredentials: (credentials: User | null) => set({ credentials }),
  clearCredentials: () => set({ credentials: null }),
}));

export default useAccountStore;
