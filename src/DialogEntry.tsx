import { Fragment } from 'react';
import useDialog from './use-dialog';

interface DialogEntryProps {
  dialogsMap: Map<string, () => JSX.Element>;
}

export default function DialogEntry({ dialogsMap }: DialogEntryProps) {
  const { dialogs } = useDialog();

  if (!dialogsMap) {
    throw Error('DialogEntry: dialogsMap is not provided.');
  }

  return (
    <Fragment>
      {dialogs.map((dialog) => {
        const Dialog = dialogsMap.get(dialog.name);
        return Dialog ? <Dialog key={dialog.name} /> : null;
      })}
    </Fragment>
  );
}
