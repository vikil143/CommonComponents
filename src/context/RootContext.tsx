import React from 'react';
import ToastWrapper from './Toast';
import {HasChild} from '../types';

interface RootContextProps extends HasChild {}

export default function RootContext({children}: RootContextProps) {
  return <ToastWrapper>{children}</ToastWrapper>;
}
