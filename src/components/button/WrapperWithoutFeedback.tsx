import {TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {HasChild, OnPress} from '../../types';

interface WrapperProps extends HasChild, OnPress {}

export default function WrapperWithoutFeedback({
  children,
  onPress,
}: WrapperProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {children}
    </TouchableWithoutFeedback>
  );
}
