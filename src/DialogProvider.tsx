import { PropsWithChildren, useState, useCallback, useMemo } from 'react';
import DialogEntry from './DialogEntry';
import DialogContext from './context';

interface DialogProviderProps {
  dialogsMap: Map<string, () => JSX.Element>;
}

export default function DialogProvider({
  dialogsMap,
  children,
}: PropsWithChildren<DialogProviderProps>) {
  const [dialogs, setDialogs] = useState<
    { name: string; data?: any; index: number }[]
  >([]);

  const updateDialog = useCallback(
    (name: string, data?: any) => {
      const updatedDialogs = dialogs.map((dialog) => {
        if (dialog.name === name) {
          console.log('updating');
          return { ...dialog, data: { ...dialog.data, ...data } };
        }
        console.warn(
          `Dialog with name ${name} was not found in the context. It could be closed at the moment.`,
        );
        return dialog;
      });
      setDialogs(updatedDialogs);
    },
    [dialogs, setDialogs],
  );

  const openDialog = useCallback(
    (name: string, data?: any) => {
      const exists = dialogs.find((dialog) => dialog.name === name);
      if (!exists) {
        setDialogs([...dialogs, { name, index: dialogs.length, data }]);
      } else {
        console.warn(`Dialog with name ${name} is opened already.`);
      }
    },
    [dialogs, setDialogs],
  );

  const closeDialog = useCallback(
    (name: string) => {
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

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <DialogEntry dialogsMap={dialogsMap} />
    </DialogContext.Provider>
  );
}
