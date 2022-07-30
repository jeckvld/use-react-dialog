import React, { useContext } from 'react';
import type { DialogContextProps, DialogByNameContextProps } from './types';
import DialogContext from './context';
import useDialogByName from './use-dialog-by-name';

export default function useDialog(): DialogContextProps<string>;
export default function useDialog<TData, TName>(
  name: TName,
): DialogByNameContextProps<TData, TName>;
export default function useDialog<TData, TName>(
  name: TName,
  data: TData,
): DialogByNameContextProps<TData, TName>;

export default function useDialog<TData, TName extends string>(
  name?: TName,
  data?: any,
) {
  if (name) {
    return useDialogByName<TData, TName>(name, data);
  }

  return useContext<DialogContextProps<TName>>(DialogContext);
}
