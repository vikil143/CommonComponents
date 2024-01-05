import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ContainerViewStyles} from '../../types';
import {Colors} from '../../utility/Colors';

interface ProgressBarProps extends Partial<ContainerViewStyles> {
  width?: string;
}

export default function ProgressBar({
  containerStyle,
  width = '20%',
}: ProgressBarProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.main, {width}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    borderRadius: 8,
    backgroundColor: Colors.darkBlue,
  },
  container: {
    backgroundColor: Colors.progressIndicatorColor,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    height: 15,
  },
});
