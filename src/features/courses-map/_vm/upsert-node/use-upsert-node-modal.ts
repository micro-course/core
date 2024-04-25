import { create } from "zustand";
import { CoursesMapNode } from "../../_domain/types";

interface UpsertNodeModalState {
  isOpen: boolean;
  node?: CoursesMapNode;

  open: (node?: CoursesMapNode) => void;
  close: () => void;
}

export const useUpsertNodeModal = create<UpsertNodeModalState>()((set) => ({
  isOpen: false,
  open: (node?: CoursesMapNode) => set({ isOpen: true, node }),
  close: () => set({ isOpen: false, node: undefined }),
}));
