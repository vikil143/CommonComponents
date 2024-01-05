import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  I18nManager,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  withTiming,
  runOnJS,
  interpolateColor,
} from 'react-native-reanimated';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
// import colors from '../utils/colors';
// import commonStyles from '../utils/commonStyles';

const PADDING = 4;
const CIRCLE_SIZE = 15;
const CONTAINER_SIZE = 40;
const SIZE = CONTAINER_SIZE - PADDING * 2 - CIRCLE_SIZE;
// for arabic slide postion
const SLIDE_SIZE = I18nManager.isRTL ? -1 * SIZE : SIZE;
const COLORS = {
  selectedLight: '#c2ffb7',
  selectedDark: '#009a00',
  unSelectedLight: '#ffb5b5',
  unSelectedDark: '#ff2300',
};

interface SwitchProps {
  defaultValue?: boolean;
  onValueChange?: (isActive: boolean) => void;
}

function Switch({defaultValue, onValueChange}: SwitchProps) {
  const animatedValue = useSharedValue(defaultValue ? SLIDE_SIZE : 0);

  const toggleSwitch = () => {
    'worklet';
    const isActive = animatedValue.value == 0;
    const scrollTo = isActive ? SLIDE_SIZE : 0;

    animatedValue.value = withTiming(scrollTo, {}, () => {
      if (typeof onValueChange === 'function') {
        runOnJS(onValueChange)(isActive);
      }
    });
  };

  const onPress = () => runOnUI(toggleSwitch)();

  const circleStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, SLIDE_SIZE],
      [COLORS.unSelectedDark, COLORS.selectedDark],
    );
    return {
      backgroundColor,
      transform: [{translateX: animatedValue.value}],
    };
  });

  const containerStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, SLIDE_SIZE],
      [COLORS.unSelectedLight, COLORS.selectedLight],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <View style={[commonStyles.row]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[styles.container, containerStyles]}>
          <Animated.View
            style={[styles.circle, commonStyles.shadowNormal, circleStyles]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Colors.white,
  },
  container: {
    width: CONTAINER_SIZE,
    backgroundColor: Colors.grey,
    padding: PADDING,
    borderRadius: CIRCLE_SIZE,
  },
});

export default Switch;
