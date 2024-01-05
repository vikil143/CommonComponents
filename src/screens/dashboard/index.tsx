import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp} from '../../utility/animatedHelper';
import {SCREEN_WIDTH} from '../../utility/constants';

interface DashboardScreensProps {}

export default function DashboardScreens({}: DashboardScreensProps) {
  const x = useSharedValue(SIZE);
  const y = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(({}) => {
      offsetX.value = x.value;
      offsetY.value = y.value;
    })
    .onChange(({translationX, translationY}) => {
      x.value = translationX + offsetX.value;
      y.value = translationY + offsetY.value;
    });

  const style = useAnimatedStyle(() => {
    return {
      width: x.value,
      transform: [{translateX: x.value / 2}],
      height: SIZE,
    };
  });

  return (
    <View style={[styles.container]}>
      <View style={[]}>
        {/* <Animated.View style={[styles.box]} /> */}
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.box, style]} />
        </GestureDetector>
        {/* <Animated.View style={[styles.box]} /> */}
      </View>
    </View>
  );
}

const SIZE = 40;

const styles = StyleSheet.create({
  box: {
    // width: SIZE,
    // height: SIZE,
    backgroundColor: 'red',
    // borderRadius: SIZE,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
