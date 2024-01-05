import {TouchableHighlight, TouchableHighlightProps} from 'react-native';
import React from 'react';

interface HighlightedProps extends TouchableHighlightProps {}

export default function HighlightedButton({
  children,
  onPress,
  ...props
}: HighlightedProps) {
  return (
    <TouchableHighlight onPress={onPress} {...props}>
      {children}
    </TouchableHighlight>
  );
}
