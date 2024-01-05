// import {TFunction} from 'i18next';

// interface LocalizationTypes {
//     t: TFunction<'translation', undefined>;
// }

type TYPE = 'success' | 'danger';

interface ToastTypes {
  showToast: (message: string, type?: TYPE, duration?: number) => void;
}

export type {ToastTypes, TYPE};
