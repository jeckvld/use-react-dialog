import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DialogProvider from '../src/DialogProvider';
import useDialogByName from '../src/use-dialog-by-name';

enum Dialogs {
  DialogOne = 'DialogOne',
  DialogTwo = 'DialogTwo',
}

const dialogsMap = new Map([
  [Dialogs.DialogOne, () => <p>this is {Dialogs.DialogOne}</p>],
  [Dialogs.DialogTwo, () => <p>this is {Dialogs.DialogTwo}</p>],
]);

function Test() {
  const {
    openCurrentDialog,
    updateCurrentDialog,
    data,
    closeCurrentDialog,
    openDialog,
    closeAllDialogs,
    updateDialog,
  } = useDialogByName(Dialogs.DialogOne);

  return (
    <>
      Data: {data?.message || 'no data provided'}
      <button onClick={() => openDialog(Dialogs.DialogTwo)}>
        open {Dialogs.DialogTwo}
      </button>
      <button onClick={openCurrentDialog}>open {Dialogs.DialogOne}</button>
      <button
        onClick={() => updateCurrentDialog({ message: 'updated message!' })}
      >
        update {Dialogs.DialogOne}
      </button>
      <button
        onClick={() => updateDialog('unknown', { message: 'updated message!' })}
      >
        update unknown dialog
      </button>
      <button onClick={closeCurrentDialog}>close {Dialogs.DialogOne}</button>
      <button onClick={closeAllDialogs}>close all</button>
    </>
  );
}

describe('tests', () => {
  test('throw when dialogsMap is not provided', () => {
    // mock console.error to keep logs clean here
    console.error = jest.fn();

    expect(() =>
      render(<DialogProvider dialogsMap={undefined as any} />),
    ).toThrowError('DialogEntry: dialogsMap is not provided.');
  });

  test('show nothing when Dialog component was not found in the dialogsMap', () => {
    render(
      <DialogProvider dialogsMap={new Map()}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(open);

    // dialog wasn't opened because according component was not found
    expect(screen.queryByText(`this is ${Dialogs.DialogOne}`)).toBeFalsy();
  });

  test('open dialog', () => {
    render(
      <DialogProvider dialogsMap={dialogsMap}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(open);

    // dialog was opened
    screen.getByText(`this is ${Dialogs.DialogOne}`);
  });

  test('open same dialog two times', async () => {
    // mock console.warn to keep logs clean here
    console.warn = jest.fn();

    render(
      <DialogProvider dialogsMap={dialogsMap}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(open);

    // dialog was opened
    screen.getByText(`this is ${Dialogs.DialogOne}`);

    // click open the same dialog on more time
    fireEvent.click(open);

    await waitFor(() => {
      // warning about opening the same dialog
      expect(console.warn).toHaveBeenCalledWith(
        `Dialog with name ${Dialogs.DialogOne} is opened already.`,
      );
    });
  });

  test('update dialog', async () => {
    render(
      <DialogProvider dialogsMap={dialogsMap}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(open);

    // no data provided by default
    screen.getByText('Data: no data provided');

    // update the dialog
    const update = screen.getByText(`update ${Dialogs.DialogOne}`);
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
      <DialogProvider dialogsMap={dialogsMap}>
        <Test />
      </DialogProvider>,
    );

    // open a dialog
    const open = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(open);

    // update unknown dialog
    const update = screen.getByText('update unknown dialog');
    fireEvent.click(update);

    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith(
        'Dialog with name unknown was not found in the context. It could be closed at the moment.',
      );
    });
  });

  test('close dialog', () => {
    render(
      <DialogProvider dialogsMap={dialogsMap}>
        <Test />
      </DialogProvider>,
    );

    // open the dialog
    const open = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(open);

    // dialog was opened
    screen.getByText(`this is ${Dialogs.DialogOne}`);

    // click close button
    const close = screen.getByText(`close ${Dialogs.DialogOne}`);
    fireEvent.click(close);

    // dialog in closed
    expect(screen.queryByText(`this is ${Dialogs.DialogOne}`)).toBeFalsy();
  });

  test('open two dialogs and then close all of them', () => {
    render(
      <DialogProvider dialogsMap={dialogsMap}>
        <Test />
      </DialogProvider>,
    );

    const openDialogOne = screen.getByText(`open ${Dialogs.DialogOne}`);
    fireEvent.click(openDialogOne);

    const openDialogTwo = screen.getByText(`open ${Dialogs.DialogTwo}`);
    fireEvent.click(openDialogTwo);

    // both dialogs were opened
    screen.getByText(`this is ${Dialogs.DialogOne}`);
    screen.getByText(`this is ${Dialogs.DialogTwo}`);

    // click close all button
    const closeAll = screen.getByText('close all');
    fireEvent.click(closeAll);

    // both dialogs are closed
    expect(screen.queryByText(`this is ${Dialogs.DialogOne}`)).toBeFalsy();
    expect(screen.queryByText(`this is ${Dialogs.DialogTwo}`)).toBeFalsy();
  });
});
