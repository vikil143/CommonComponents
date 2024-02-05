import {Pressable, PressableProps} from 'react-native';
import React from 'react';

interface WrapperProps extends PressableProps {}

export default function Wrapper({children, ...props}: WrapperProps) {
  return <Pressable {...props}>{children}</Pressable>;
}
