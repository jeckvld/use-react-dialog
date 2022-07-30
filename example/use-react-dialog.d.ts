import { DialogContextProps, DialogByNameContextProps } from 'use-react-dialog';
import { dialogs } from './src/dialogs';

declare module 'use-react-dialog' {
  type Name = keyof typeof dialogs;
  export function useDialog(): DialogContextProps<Name>;
  export function useDialog<T>(name: Name): DialogByNameContextProps<T, Name>;
  export function useDialog<T>(
    name: Name,
    data: T,
  ): DialogByNameContextProps<T, Name>;
}
