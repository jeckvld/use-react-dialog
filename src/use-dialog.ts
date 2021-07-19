import { useContext } from 'react';
import type { DialogContextProps, DialogByNameContextProps } from './types';
import DialogContext from './context';
import useDialogByName from './use-dialog-by-name';

export default function useDialog(): DialogContextProps;
export default function useDialog(name: string): DialogByNameContextProps;

export default function useDialog(name?: string) {
  if (name) {
    return useDialogByName(name);
  }

  return useContext<DialogContextProps>(DialogContext);
}
