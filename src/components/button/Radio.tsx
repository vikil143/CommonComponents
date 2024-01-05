import React from 'react';
import {
  TouchableWithoutFeedback,
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';
import {OnPress, ViewStyles} from '../../types';
import {Colors} from '../../utility/Colors';

interface RadioProps extends Partial<ViewStyles>, OnPress {
  size?: number;
  selected?: boolean;
  innerSize?: number;
  innerStyle?: ViewStyle;
}

const RADIO_BUTTON_SIZE = 35;

function RadioButton({
  size = RADIO_BUTTON_SIZE,
  selected = false,
  style,
  onPress,
  innerSize = size - 5,
  innerStyle,
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
            backgroundColor: selected ? Colors.primary : Colors.white,
          },
          style,
        ]}>
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: size / 2,
            backgroundColor: Colors.white,
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

export default React.memo(RadioButton);
