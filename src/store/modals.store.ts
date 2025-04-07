import { create } from "zustand";

type Store = {
  isLogin: boolean;
  isLogout: boolean;
  setIsOpen: (modal: "login" | "logout", isOpen: boolean) => void;
};

export const useModals = create<Store>()((set) => ({
  isLogin: false,
  isLogout: false,
  setIsOpen: (modal, isOpen) => {
    switch (modal) {
      case "login":
        set({ isLogin: isOpen });
        break;
      case "logout":
        set({ isLogout: isOpen });
        break;
      default:
        break;
    }
  },
}));
