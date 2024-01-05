import {Pressable} from 'react-native';
import React from 'react';
import {ContainerViewStyles, HasChild, OnPress} from '../../types';

interface WrapperProps
  extends HasChild,
    OnPress,
    Partial<ContainerViewStyles> {}

export default function Wrapper({
  children,
  onPress,
  containerStyle,
}: WrapperProps) {
  return (
    <Pressable style={[containerStyle]} onPress={onPress}>
      {children}
    </Pressable>
  );
}
