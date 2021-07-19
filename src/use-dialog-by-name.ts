import { useCallback, useMemo, useContext } from 'react';
import DialogContext from './context';
import type { DialogByNameContextProps, DialogContextProps } from './types';

export default function useDialogByName(
  name: string,
): DialogByNameContextProps {
  const { dialogs, openDialog, closeDialog, updateDialog, ...rest } =
    useContext<DialogContextProps>(DialogContext);

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

  return useMemo(
    () => ({
      ...rest,
      isOpen: dialog ? true : false,
      index: dialog ? dialog.index : -1,
      data: dialog ? dialog.data : undefined,
      openCurrentDialog,
      closeCurrentDialog,
      updateCurrentDialog,
      dialogs,
      openDialog,
      closeDialog,
      updateDialog,
    }),
    [
      rest,
      openCurrentDialog,
      closeCurrentDialog,
      updateCurrentDialog,
      dialogs,
      dialog,
      openDialog,
      closeDialog,
      updateDialog,
    ],
  );
}
