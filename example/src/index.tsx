import ReactDOM from 'react-dom';
import App from './App';
import { DialogProvider } from 'use-react-dialog';
import { dialogs } from './dialogs';

const dialogsMap = new Map(
  Object.values(dialogs).map((dialog) => [dialog.name, dialog]),
);

ReactDOM.render(
  <DialogProvider dialogsMap={dialogsMap}>
    <App />
  </DialogProvider>,
  document.getElementById('root'),
);
