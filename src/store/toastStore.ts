import { create } from "zustand";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  showToast: (type: "success" | "error", message: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (type, message) => {
    const id = Date.now().toString();

    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    setTimeout(
      () =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
      2000
    );
  },
}));
