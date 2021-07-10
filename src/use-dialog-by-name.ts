import { useCallback, useMemo } from 'react';
import useDialog from './use-dialog';
import type { DialogContextProps } from './types';

interface UseDialogByName extends DialogContextProps {
  isOpen: boolean;
  index: number;
  openCurrentDialog(data?: any): void;
  closeCurrentDialog(): void;
  updateCurrentDialog(data?: any): void;
  data?: any;
}

export default function useDialogByName(name: string): UseDialogByName {
  const { dialogs, openDialog, closeDialog, updateDialog, ...rest } =
    useDialog();

  const dialog = useMemo(
    () => dialogs.find((dialog) => dialog.name === name),
    [dialogs, name],
  );

  const openCurrentDialog = useCallback(
    (data?: any) => openDialog(name, data),
    [openDialog, name],
  );

  const closeCurrentDialog = useCallback(
    () => closeDialog(name),
    [closeDialog, name],
  );

  const updateCurrentDialog = useCallback(
    (data?: any) => updateDialog(name, data),
    [updateDialog, name],
  );

  if (!dialog) {
    return {
      ...rest,
      isOpen: false,
      index: -1,
      openCurrentDialog,
      closeCurrentDialog,
      updateCurrentDialog,
      dialogs,
      openDialog,
      closeDialog,
      updateDialog,
    };
  }

  return {
    ...rest,
    isOpen: true,
    index: dialog.index,
    data: dialog.data,
    openCurrentDialog,
    closeCurrentDialog,
    updateCurrentDialog,
    dialogs,
    openDialog,
    closeDialog,
    updateDialog,
  };
}
