import { useContext } from 'react';
import type { DialogContextProps } from './types';
import DialogContext from './context';

export default function useDialog() {
  return useContext<DialogContextProps>(DialogContext);
}
