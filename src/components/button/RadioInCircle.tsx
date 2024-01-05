import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {OnPress, ViewStyles} from '../../types';
import {Colors} from '../../utility/Colors';

interface RadioProps extends Partial<ViewStyles>, OnPress {
  size?: number;
  selected?: boolean;
  innerSize?: number;
  innerStyle?: ViewStyle;
}

const RADIO_BUTTON_SIZE = 35;

export default function RadioInCircle({
  onPress,
  size = RADIO_BUTTON_SIZE,
  selected = false,
  style,
  innerStyle,
  innerSize = size - 10,
}: RadioProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            borderRadius: size,
            width: size + 2,
            height: size + 2,
            backgroundColor: Colors.white,
          },
          style,
        ]}>
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: size / 2,
            backgroundColor: selected ? Colors.cameraCaputer : Colors.white,
            ...innerStyle,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 9,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderColor: Colors.cameraCaputer,
  },
});
