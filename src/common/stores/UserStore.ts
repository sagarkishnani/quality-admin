import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../interfaces/User.interface";

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
            isLoading: false,
            setIsLoading: (isLoading: boolean) => set({ isLoading })
        }),
        {
            name: "user-store",
        }
    )
);

export default useUserStore;