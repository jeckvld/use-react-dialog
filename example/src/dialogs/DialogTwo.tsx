import { useDialogByName } from 'use-react-dialog';
import {
  Dialog,
  DialogTitle,
  Divider,
  Button,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { Dialogs } from './types';

export default function DialogTwo() {
  const {
    closeCurrentDialog,
    index,
    isOpen,
    openDialog,
    closeAllDialogs,
    data,
  } = useDialogByName(Dialogs.DialogTwo);

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>{Dialogs.DialogTwo}</DialogTitle>
      <Divider />
      <DialogContent>
        <p>This dialog has {index} index in global dialogs stack.</p>
        <p>Data: {JSON.stringify(data)}</p>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color='primary' variant='contained' onClick={closeAllDialogs}>
          Close all dialogs
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={closeCurrentDialog}
        >
          Close this dialog
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={() =>
            openDialog(Dialogs.DialogOne, {
              message: `This message was passed from ${Dialogs.DialogTwo} through the React Context.`,
            })
          }
        >
          Open Dialog One
        </Button>
      </DialogActions>
    </Dialog>
  );
}
