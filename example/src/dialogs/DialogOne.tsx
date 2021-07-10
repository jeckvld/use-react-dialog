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

export default function DialogOne() {
  const {
    closeCurrentDialog,
    index,
    isOpen,
    openDialog,
    closeAllDialogs,
    data,
  } = useDialogByName(Dialogs.DialogOne);

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>{Dialogs.DialogOne}</DialogTitle>
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
            openDialog(Dialogs.DialogTwo, {
              message: `This message was passed from ${Dialogs.DialogOne} through the React Context.`,
            })
          }
        >
          Open Dialog Two
        </Button>
      </DialogActions>
    </Dialog>
  );
}
