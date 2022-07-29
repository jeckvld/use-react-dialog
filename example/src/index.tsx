import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DialogProvider } from 'use-react-dialog';
import { dialogs } from './dialogs';

ReactDOM.render(
  <DialogProvider dialogs={dialogs}>
    <App />
  </DialogProvider>,
  document.getElementById('root'),
);
