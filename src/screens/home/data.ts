import {HomeNavigator} from '../../routes/type';

interface ModalData {
  id: number;
  name: string;
  route: keyof HomeNavigator;
}

export const ModalData: ModalData[] = [
  {
    id: 1,
    name: 'Toast Wrapper',
    route: 'ShowToast',
  },
];
