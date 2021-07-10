import DialogOne from './DialogOne';
import DialogTwo from './DialogTwo';
import { Dialogs } from './types';

const dialogs: Record<Dialogs, () => JSX.Element> = {
  DialogOne,
  DialogTwo,
} as const;

export { dialogs, Dialogs };
