import React, { ComponentType } from 'react';
import useDialog from './use-dialog';

interface DialogEntryProps {
  dialogsMap: Map<string, () => JSX.Element>;
}

interface DialogProps<TData, TName extends string> {
  Component: ComponentType<{ data: TData; name: TName }>;
  name: TName;
}

function DialogWithData<TData, TName extends string>({
  Component,
  name,
}: DialogProps<TData, TName>) {
  const { data } = useDialog<TData, TName>(name);
  return <Component data={data} name={name} />;
}

export default function DialogEntry({ dialogsMap }: DialogEntryProps) {
  const { dialogs } = useDialog();

  return (
    <>
      {dialogs.map((dialog) => {
        const Dialog = dialogsMap.get(dialog.name);
        return Dialog ? (
          <DialogWithData
            key={dialog.name}
            name={dialog.name}
            Component={Dialog}
          />
        ) : null;
      })}
    </>
  );
}
