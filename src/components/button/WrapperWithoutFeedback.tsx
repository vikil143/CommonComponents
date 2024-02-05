import {
  TouchableWithoutFeedback,
  View,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import React from 'react';
import {HasChild, OnPress} from '../../types';

interface WrapperProps extends TouchableWithoutFeedbackProps {}

export default function WrapperWithoutFeedback({
  children,
  ...props
}: WrapperProps) {
  return (
    <TouchableWithoutFeedback {...props}>{children}</TouchableWithoutFeedback>
  );
}
