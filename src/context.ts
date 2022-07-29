import { createContext } from 'react';
import type { DialogContextProps } from './types';

const noop = () => {};

const initialData = {
  dialogs: [],
  openDialog: noop,
  closeDialog: noop,
  updateDialog: noop,
  closeAllDialogs: noop,
};

const DialogContext = createContext<DialogContextProps<any>>(initialData);

export default DialogContext;
