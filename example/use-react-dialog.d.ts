import { DialogByNameContextProps } from 'use-react-dialog';
import { dialogs } from './src/dialogs';

declare module 'use-react-dialog' {
  type Name = keyof typeof dialogs;
  export function useDialog<T>(): DialogByNameContextProps<T, Name>;
  export function useDialog<T>(
    name: Name,
    data?: any,
  ): DialogByNameContextProps<T, Name>;
}
