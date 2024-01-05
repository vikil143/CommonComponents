import {StyleSheet, View, ColorValue} from 'react-native';
import React from 'react';
import {ViewStyles} from '../../types';
import {Colors} from '../../utility/Colors';

interface HorizontalProps extends Partial<ViewStyles> {
  color?: ColorValue;
}

export default function Horizontal({
  style,
  color = Colors.grey,
}: HorizontalProps) {
  return <View style={[styles.container, {backgroundColor: color}, style]} />;
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.grey,
  },
});
