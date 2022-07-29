import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DialogProvider from '../src/DialogProvider';
import useDialogByName from '../src/use-dialog-by-name';

const dialogs = {
  DialogOne: () => <p>this is DialogOne</p>,
  DialogTwo: () => <p>this is DialogTwo</p>,
} as const;

function Test() {
  const {
    openCurrentDialog,
    updateCurrentDialog,
    data,
    closeCurrentDialog,
    openDialog,
    closeAllDialogs,
    updateDialog,
  } = useDialogByName<{ message?: string }, keyof typeof dialogs>('DialogOne');

  return (
    <>
      Data: {data?.message || 'no data provided'}
      <button onClick={() => openDialog('DialogTwo')}>open DialogTwo</button>
      <button onClick={() => openCurrentDialog()}>open DialogOne</button>
      <button
        onClick={() => updateCurrentDialog({ message: 'updated message!' })}
      >
        update DialogOne
      </button>
      <button
        onClick={() =>
          updateDialog('unknown' as any, { message: 'updated message!' })
        }
      >
        update unknown dialog
      </button>
      <button onClick={closeCurrentDialog}>close DialogOne</button>
      <button onClick={closeAllDialogs}>close all</button>
    </>
  );
}

describe('tests', () => {
  test('show nothing when Dialog component was not found in the dialogsMap', () => {
    render(
      <DialogProvider dialogs={{}}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open DialogOne`);
    fireEvent.click(open);

    // dialog wasn't opened because according component was not found
    expect(screen.queryByText(`this is DialogOne`)).toBeFalsy();
  });

  test('open dialog', () => {
    render(
      <DialogProvider dialogs={dialogs}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open DialogOne`);
    fireEvent.click(open);

    // dialog was opened
    screen.getByText(`this is DialogOne`);
  });

  test('update dialog', async () => {
    render(
      <DialogProvider dialogs={dialogs}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open DialogOne`);
    fireEvent.click(open);

    // no data provided by default
    screen.getByText('Data: no data provided');

    // update the dialog
    const update = screen.getByText(`update DialogOne`);
    fireEvent.click(update);

    await waitFor(() => {
      // dialog's data is updated
      screen.getByText('Data: updated message!');
    });
  });

  test('update unknown dialog', async () => {
    // mock console.warn to keep logs clean here
    console.warn = jest.fn();

    render(
      <DialogProvider dialogs={dialogs}>
        <Test />
      </DialogProvider>,
    );

    // open a dialog
    const open = screen.getByText(`open DialogOne`);
    fireEvent.click(open);

    // update unknown dialog
    const update = screen.getByText('update unknown dialog');
    fireEvent.click(update);

    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith(
        'Dialog unknown was not found in the context.',
      );
    });
  });

  test('close dialog', () => {
    render(
      <DialogProvider dialogs={dialogs}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open DialogOne`);
    fireEvent.click(open);

    // dialog was opened
    screen.getByText(`this is DialogOne`);

    // click close button
    const close = screen.getByText(`close DialogOne`);
    fireEvent.click(close);

    // dialog in closed
    expect(screen.queryByText(`this is DialogOne`)).toBeFalsy();
  });

  test('open two dialogs and then close all of them', () => {
    render(
      <DialogProvider dialogs={dialogs}>
        <Test />
      </DialogProvider>,
    );

    const openDialogOne = screen.getByText(`open DialogOne`);
    fireEvent.click(openDialogOne);

    const openDialogTwo = screen.getByText(`open DialogTwo`);
    fireEvent.click(openDialogTwo);

    // both dialogs were opened
    screen.getByText(`this is DialogOne`);
    screen.getByText(`this is DialogTwo`);

    // click close all button
    const closeAll = screen.getByText('close all');
    fireEvent.click(closeAll);

    // both dialogs are closed
    expect(screen.queryByText(`this is DialogOne`)).toBeFalsy();
    expect(screen.queryByText(`this is DialogTwo`)).toBeFalsy();
  });
});
