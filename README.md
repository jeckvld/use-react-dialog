# use-react-dialog &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/use-react-dialog.svg?style=flat)](https://www.npmjs.com/package/use-react-dialog) [![npm version](https://img.shields.io/bundlephobia/min/use-react-dialog)](https://www.npmjs.com/package/use-react-dialog) [![npm version](https://img.shields.io/bundlephobia/minzip/use-react-dialog)](https://www.npmjs.com/package/use-react-dialog)

**use-react-dialog** is a lightweight [**React**](https://reactjs.org/) library written on a [**TypeScript**](https://www.typescriptlang.org/). The main goal is to simplify the way you manage dialog windows in your React application.

## Installation

```bash
// using npm
npm install use-react-dialog

// using yarn
yarn add use-react-dialog
```

## Documentation

**`<DialogProvider />`** - React Context Provider. Used for passing context data to the application. Required to be used.

_Props:_

- `dialogs` - an **object** that defines all the dialogs in a way: Record<string, DialogComponent>. This is used for identifying the correct dialog component by its name for different operations (e.g. opening, closing, etc.).

_Returns:_ JSX.Element.

---

**`useDialog`** - React Hook. Used for fetching data from the DialogProvider.

_Props:_

- `name`- a **string** that is used as an identifier for a dialog window. Optional.
- `data`- **anything** that is passed as a data to a dialog window. Optional.

_Returns:_

- `name`- a **string** that is used as an identifier for a dialog window.
- `dialogs` - an **array** of all the dialogs that are open at the moment. Default value: [].
- `openDialog` - a **function** that is used for opening a dialog window. Only one dialog can be opened within one function call.
- `closeDialog`- a **function** that is used for closing a dialog window. Only one dialog can be closed within one function call.
- `updateDialog`- a **function** that is used for updating a dialog window. Only one dialog can be updated within one function call.
- `closeAllDialogs`- a **function** that is used for closing all the open dialogs.

_Returns these properties only when `name` is provided to the hook:_

- `isOpen` - a **boolean** that indicates the state of the dialog.
- `data`- **anything** that was passed as a data to a dialog window.
- `index` - a **number** that indicates the index of the current dialog in a `dialogs` array. If the dialog is closed this equals `-1`.
- `openCurrentDialog` - a **function** that is used for opening dialog window by name that was passed to the hook. You can pass additional data that will be merged with the data you passed to the `useDialog` hook before.
- `closeCurrentDialog`- a **function** that is used for closing dialog window by name that was passed to the hook.
- `updateCurrentDialog`- a **function** that is used for updating dialog window by name that was passed to the hook.

---

## Usage (**TypeScript**)

```tsx
// src/DialogOne.tsx

import { useDialog } from 'use-react-dialog';

// implement functionality of your dialog
function DialogOne() {
  const { closeCurrentDialog, isOpen, openCurrentDialog } = useDialog('DialogOne');

  if (!isOpen) {
    return (
      // opens DialogOne, alternatively can be -> openDialog('dialog name')
      <button onClick={() => openCurrentDialog()}>
        open dialog one
      </button>
    );
  }

  return (
    <div>
      <p>hello from the dialog one!</p>
      <button onClick={closeCurrentDialog}>you can close me now</button>
    </div>
  );
}


...

// src/dialogs.ts

import { DialogOne } from './DialogOne';

// define dialogs object that contains all the dialogs you gonna use
const dialogs = {
  DialogOne,
} as const;

...

// use-react-dialog.d.ts

// overwrite the types, so everything is well-typed in your project
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

...

// src/index.ts

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

```

## Usage (**JavaScript**)

```jsx
// src/DialogOne.jsx

import { useDialog } from 'use-react-dialog';

// implement functionality of your dialog
function DialogOne() {
  const { closeCurrentDialog, isOpen, openCurrentDialog } = useDialog('DialogOne');

  if (!isOpen) {
    return (
      // opens DialogOne, alternatively can be -> openDialog('dialog name')
      <button onClick={() => openCurrentDialog()}>
        open dialog one
      </button>
    );
  }

  return (
    <div>
      <p>hello from dialog one!</p>
      <button onClick={closeCurrentDialog}>you can close me now</button>
    </div>
  );
}

...

// src/dialogs.js

// define dialogs object that contains all the dialogs you gonna use
const dialogs = {
  DialogOne,
};

...

// src/index.js

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

```

## Examples

Live demo (MaterialUI, TypeScript, CodeSandbox) example you can find [here](https://codesandbox.io/s/use-react-dialog-example-ts-12ljn8).

Source code of that example you can find in [/example](/example) directory.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
