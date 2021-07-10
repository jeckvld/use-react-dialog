import { useDialog } from 'use-react-dialog';
import { Box, Button } from '@material-ui/core';
import { Dialogs } from './dialogs';

export default function App() {
  const { dialogs, openDialog } = useDialog();
  return (
    <Box>
      <p>There are {dialogs.length} dialogs in the global dialogs stack.</p>

      <Box>
        <Button
          color='primary'
          variant='contained'
          onClick={() =>
            openDialog(Dialogs.DialogOne, {
              message:
                'This message was passed from the initial page through the React Context.',
            })
          }
        >
          Open Dialog One
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          color='primary'
          variant='contained'
          onClick={() =>
            openDialog(Dialogs.DialogTwo, {
              message:
                'This message was passed from the initial page through the React Context.',
            })
          }
        >
          Open Dialog Two
        </Button>
      </Box>
    </Box>
  );
}
