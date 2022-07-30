export interface DialogContextProps<TName> {
  dialogs: { name: TName; index: number; data?: any }[];
  openDialog(name: TName, data?: any): void;
  closeDialog(name: TName): void;
  updateDialog(name: TName, data?: any): void;
  closeAllDialogs(): void;
}

export interface DialogByNameContextProps<TData, TName>
  extends DialogContextProps<TName> {
  isOpen: boolean;
  index: number;
  openCurrentDialog(data?: TData): void;
  closeCurrentDialog(): void;
  updateCurrentDialog(data: TData): void;
  data: TData;
}
