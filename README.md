# use-react-dialog &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/use-react-dialog.svg?style=flat)](https://www.npmjs.com/package/query-wrapper) [![npm version](https://img.shields.io/bundlephobia/min/use-react-dialog)](https://www.npmjs.com/package/query-wrapper) [![npm version](https://img.shields.io/bundlephobia/minzip/use-react-dialog)](https://www.npmjs.com/package/query-wrapper)

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

Props:

- `dialogsMap` - a Map that defines all the dialogs in a way: Map<string, DialogComponent>. This is used for identifying the correct dialog component by its name for different operations (e.g. opening, closing, etc.).

Returns: ReactNode.

---

**`useDialog`** - React Hook. Used for fetching data from the DialogProvider.

Props: no props.
Returns:

- `dialogs` - an array of all the dialogs that are open at the moment. Default value: [].
- `openDialog` - a function that is used for opening a dialog window. Only one dialog can be opened within one function call.
- `closeDialog`- a function that is used for closing a dialog window. Only one dialog can be closed within one function call.
- `updateDialog`- a function that is used for updating a dialog window. Only one dialog can be updated within one function call.
- `closeAllDialogs`- a function that is used for closing all the open dialogs.

---

**`useDialogByName`** - React Hook. Used for fetching data from the DialogProvider.

Props:

- `name`- a string that is used as an identifier for a dialog window.
  Returns:
- All the props from `useDialog` return value.
- `index` - a number that indicates the index of the current dialog in a `dialogs` array. If the dialog is closed this equals `-1`.
- `openCurrentDialog` - a function that is used for opening dialog window by name that was passed to the hook.
- `closeCurrentDialog`- a function that is used for closing dialog window by name that was passed to the hook.
- `updateCurrentDialog`- a function that is used for updating dialog window by name that was passed to the hook.

---

## Usage (TypeScript)

```tsx
import { useDialogByName } from 'use-react-dialog';

// define an enum of all the dialog types you have in the application (optional)
export enum Dialogs {
  DialogOne = 'DialogOne',
}

...

// implement functionality of your dialog
function DialogOne() {
  const { closeCurrentDialog, isOpen, openDialog } = useDialogByName(
    Dialogs.DialogOne,
  );

  if (!isOpen) {
    return (
      <button onClick={() => openDialog(Dialogs.DialogOne)}>
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

// define dialogs object that contains all the dialogs you gonna use
// based on the Dialogs enum for the TypeScript
const dialogs: Record<Dialogs, () => JSX.Element> = {
  DialogOne,
} as const;

...

// in the React app entry point you should wrap everything into a DialogProvider
import ReactDOM from 'react-dom';
import { DialogEntry, DialogProvider } from 'use-react-dialog';

const dialogsMap = new Map(
  Object.values(dialogs).map((dialog) => [dialog.name, dialog]),
);

ReactDOM.render(
  <DialogProvider>
    <DialogEntry dialogsMap={dialogsMap} />
  </DialogProvider>,
  document.getElementById('root'),
);
```

## Usage (JavaScript)

```tsx
import { useDialogByName } from 'use-react-dialog';

// implement functionality of your dialog
function DialogOne() {
  const { closeCurrentDialog, isOpen, openDialog } = useDialogByName(
    Dialogs.DialogOne,
  );

  if (!isOpen) {
    return (
      <button onClick={() => openDialog('DialogOne')}>
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

// define dialogs object that contains all the dialogs you gonna use
const dialogs = {
  DialogOne,
};

...

// in react app entry point you have to wrap everything into DialogProvider
import ReactDOM from 'react-dom';
import { DialogEntry, DialogProvider } from 'use-react-dialog';

const dialogsMap = new Map(
  Object.values(dialogs).map((dialog) => [dialog.name, dialog]),
);

ReactDOM.render(
  <DialogProvider>
    <DialogEntry dialogsMap={dialogsMap} />
  </DialogProvider>,
  document.getElementById('root'),
);
```

## Examples

Executable TypeScript example you can find in [/example](/example) directory.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
