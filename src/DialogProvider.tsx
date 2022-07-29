import React, {
  PropsWithChildren,
  useState,
  useCallback,
  useMemo,
} from 'react';
import DialogEntry from './DialogEntry';
import DialogContext from './context';

interface DialogProviderProps<TName extends string> {
  dialogs: Record<TName, () => JSX.Element>;
}

export default function DialogProvider<TName extends string>({
  dialogs: initialDialogs,
  children,
}: PropsWithChildren<DialogProviderProps<TName>>) {
  const [dialogs, setDialogs] = useState<
    { name: string; data?: any; index: number }[]
  >([]);

  const updateDialog = useCallback(
    (name: TName, data?: any) => {
      const updatedDialogs = dialogs.map((dialog) => {
        if (dialog.name === name) {
          return { ...dialog, data: { ...dialog.data, ...data } };
        }
        console.warn(`Dialog ${name} was not found in the context.`);
        return dialog;
      });
      setDialogs(updatedDialogs);
    },
    [dialogs, setDialogs],
  );

  const openDialog = useCallback(
    (name: TName, data?: any) => {
      const exists = dialogs.find((dialog) => dialog.name === name);
      if (!exists) {
        setDialogs([...dialogs, { name, index: dialogs.length, data }]);
      }
    },
    [dialogs, setDialogs],
  );

  const closeDialog = useCallback(
    (name: TName) => {
      setDialogs(dialogs.filter((dialog) => dialog.name !== name));
    },
    [dialogs, setDialogs],
  );

  const closeAllDialogs = useCallback(() => {
    setDialogs([]);
  }, [setDialogs]);

  const contextValue = useMemo(
    () => ({
      openDialog,
      dialogs,
      closeDialog,
      updateDialog,
      closeAllDialogs,
    }),
    [openDialog, dialogs, closeDialog, updateDialog, closeAllDialogs],
  );

  const dialogsMap = useMemo(
    () => new Map(Object.entries<() => JSX.Element>(initialDialogs)),
    [initialDialogs],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <DialogEntry dialogsMap={dialogsMap} />
    </DialogContext.Provider>
  );
}
