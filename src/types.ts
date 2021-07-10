export interface DialogContextProps {
  dialogs: { name: string; index: number; data?: any }[];
  openDialog(name: string, data?: any): void;
  closeDialog(name: string): void;
  updateDialog(name: string, data?: any): void;
  closeAllDialogs(): void;
}
