import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserInfo {
  id: number;
  username: string;
  email?: string;
  role?: string;
}

interface UserState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    { name: 'user-store' }
  )
);
