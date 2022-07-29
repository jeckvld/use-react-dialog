import { createRoot } from 'react-dom/client';
import { DialogProvider } from 'use-react-dialog';
import App from './App';
import { dialogs } from './dialogs';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <DialogProvider dialogs={dialogs}>
    <App />
  </DialogProvider>,
);
