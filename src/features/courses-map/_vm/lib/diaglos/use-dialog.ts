import { useCallback } from "react";
import { create } from "zustand";
import { DialogParams, DialogType } from "./types";

type DialogState<T extends DialogType = DialogType> =
  | {
      isOpen: false;
    }
  | ({ isOpen: true } & DialogParams[T]);

type DialogsState = {
  dialogs: { [Key in DialogType]: DialogState<Key> };
  setDialog: <T extends DialogType>(key: T, value: DialogState<T>) => void;
};

const useDialogsStore = create<DialogsState>((set) => ({
  dialogs: {
    [DialogType.ADD_COURSE]: {
      isOpen: false,
    },
    [DialogType.ADD_IMAGE]: {
      isOpen: false,
    },
    [DialogType.UPDATE_NODE]: {
      isOpen: false,
    },
  },
  setDialog: (key, value) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [key]: value,
      },
    })),
}));

export const useDialogSetState = <T extends DialogType>(key: T) => {
  const setDialog = useDialogsStore((state) => state.setDialog);

  const setState = useCallback(
    (value: DialogState<T>) => {
      setDialog(key, value);
    },
    [setDialog, key],
  );

  const close = useCallback(() => {
    setState({ isOpen: false });
  }, [setState]);

  return {
    setState,
    close,
  };
};

export const useDialog = <T extends DialogType>(key: T) => {
  const { state } = useDialogsStore((state) => ({
    state: state.dialogs[key],
  }));

  return { state, isOpen: state.isOpen, ...useDialogSetState(key) } as const;
};
