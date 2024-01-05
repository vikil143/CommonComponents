import {useContext} from 'react';
import {ToastContext} from '../context';

const useToast = () => {
  const {showToast} = useContext(ToastContext);
  return showToast;
};

export {useToast};
