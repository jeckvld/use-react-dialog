export interface DialogContextProps {
  dialogs: { name: string; index: number; data?: any }[];
  openDialog(name: string, data?: any): void;
  closeDialog(name: string): void;
  updateDialog(name: string, data?: any): void;
  closeAllDialogs(): void;
}

export interface DialogByNameContextProps extends DialogContextProps {
  isOpen: boolean;
  index: number;
  openCurrentDialog(data?: any): void;
  closeCurrentDialog(): void;
  updateCurrentDialog(data?: any): void;
  data?: any;
}
