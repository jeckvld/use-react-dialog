import React, { useCallback, useMemo, useContext } from 'react';
import DialogContext from './context';
import type { DialogByNameContextProps, DialogContextProps } from './types';

export default function useDialogByName<TData, TName = string>(
  name: TName,
  data?: TData,
): DialogByNameContextProps<TData, TName> {
  const { dialogs, openDialog, closeDialog, updateDialog, ...rest } =
    useContext<DialogContextProps<TName>>(DialogContext);

  const dialog = useMemo(
    () => dialogs.find((dialog) => dialog.name === name),
    [dialogs, name],
  );

  const openCurrentDialog = useCallback(
    (newData?: TData) => openDialog(name, { ...data, ...newData } as TData),
    [openDialog, name],
  );

  const closeCurrentDialog = useCallback(
    () => closeDialog(name),
    [closeDialog, name],
  );

  const updateCurrentDialog = useCallback(
    (newData?: TData) => updateDialog(name, { ...data, ...newData } as TData),
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
