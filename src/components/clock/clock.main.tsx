import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedProps,
  interpolate,
  runOnUI,
  cancelAnimation,
} from 'react-native-reanimated';
import {scaleLinear, scaleTime} from 'd3-scale';
import Svg, {Circle, Line, G, Text} from 'react-native-svg';
import {SCREEN_WIDTH} from '../../utility/constants';
import {commonStyles} from '../../utility/commonStyles';
import {polar2Cartesian} from '../../utility/animatedHelper';
import WrapperWithoutFeedback from '../button/WrapperWithoutFeedback';

const SVGWIDTH = SCREEN_WIDTH / 2;
const SVGHEIGHT = SCREEN_WIDTH / 2;
const R = SCREEN_WIDTH / 2 - 30;
const MIN = 60;
const HR = 12;
const SEC = 60;
const CR = 15;
const MIN_START = 0;
const MIN_END = -1 * R + CR * 1.2;
const MIN_WIDTH = 5;
const HR_START = 0;
const HR_END = -1 * R + CR * 5.5;
const HR_WIDTH = 10;
const SEC_START = CR * 2;
const SEC_END = -1 * R + CR * 1.3;
const SEC_WIDTH = 2;
const HR_LABEL = [3, 6, 9, 12];
const MIN_HAND_HEIGHT = R * 0.85;
const SEC_HAND_HEIGHT = R * 1.25;
const HR_HAND_HEIGHT = R / 2;
const MILI_SEC = 1000;

const AnimatedLine = Animated.createAnimatedComponent(Line);

const DraweClock = () => {
  return <G></G>;
};

export default function Clock() {
  const t = new Date();
  const min = t.getMinutes();
  const sec = t.getSeconds();
  const hr = t.getHours() % 12;
  // Tried this way its repeat the in same animated value
  // const secAnimatedValue = useSharedValue(t.getSeconds());
  // const minAnimatedValue = useSharedValue(t.getMinutes());
  // const hrAnimatedValue = useSharedValue(t.getHours() % 12);
  const secAnimatedValue = useSharedValue(0);
  const minAnimatedValue = useSharedValue(0);
  const hrAnimatedValue = useSharedValue(0);
  const [animatedAdded, setAnimationAdded] = useState(false);

  useEffect(() => {
    console.log('Before animation assigned');
    runOnUI(moveAnimation)(secAnimatedValue, 60 * MILI_SEC, 60);
    runOnUI(moveAnimation)(minAnimatedValue, 60 * 60 * MILI_SEC, 60);
    runOnUI(moveAnimation)(hrAnimatedValue, 12 * 60 * 60 * MILI_SEC, 12);

    console.log('After animation assigned');
    setAnimationAdded(true);

    // return () => {
    //   console.log('Component unmount');
    //   cancelAnimation(secAnimatedValue);
    //   cancelAnimation(minAnimatedValue);
    //   cancelAnimation(hrAnimatedValue);
    // };
  }, []);

  useEffect(() => {
    if (!animatedAdded) return;

    // secAnimatedValue.modify(value => {
    //   'worklet';

    //   value = sec;
    //   return value;
    // });

    // minAnimatedValue.modify(value => {
    //   'worklet';

    //   value = min;
    //   return value;
    // });

    // hrAnimatedValue.modify(value => {
    //   'worklet';

    //   value = hr;
    //   return value;
    // });

    // runOnUI(moveAnimation)(secAnimatedValue, 60 * MILI_SEC, 60);
    // runOnUI(moveAnimation)(minAnimatedValue, 60 * 60 * MILI_SEC, 60);
    // runOnUI(moveAnimation)(hrAnimatedValue, 12 * 60 * 60 * MILI_SEC, 12);

    console.log('initail values set after');
  }, [animatedAdded]);

  const moveAnimation = (
    animatedRef: Animated.SharedValue<number>,
    duration: number,
    toValue: number,
  ) => {
    'worklet';
    animatedRef.value = withRepeat(
      withTiming(toValue, {
        duration,
        easing: Easing.linear,
      }),
      -1,
    );
  };

  const ticksMin = scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, MIN]);

  const ticksHr = scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, HR]);

  const labelsHR = scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, HR_LABEL.length]);

  const secStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: SVGWIDTH},
        {translateY: SVGHEIGHT},
        {translateY: (R / 2) * 0.625},
        {
          rotate: `${interpolate(
            secAnimatedValue.value,
            [0, 60],
            [0, 2 * Math.PI],
            'clamp',
          )}rad`,
        },
        {
          translateY: -(R / 2) * 0.625,
        },
      ],
    };
  });

  const minStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: SVGWIDTH},
        {translateY: SVGHEIGHT},
        {translateY: MIN_HAND_HEIGHT / 2},
        {
          rotate: `${interpolate(
            minAnimatedValue.value,
            [0, 60],
            [0, 2 * Math.PI],
            'clamp',
          )}rad`,
        },
        {
          translateY: -MIN_HAND_HEIGHT / 2,
        },
      ],
    };
  });

  const hrStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: SVGWIDTH},
        {translateY: SVGHEIGHT},
        {translateY: HR_HAND_HEIGHT / 2},
        {
          rotate: `${interpolate(
            hrAnimatedValue.value,
            [0, 12],
            [0, 2 * Math.PI],
            'clamp',
          )}rad`,
        },
        {
          translateY: -HR_HAND_HEIGHT / 2,
        },
      ],
    };
  });

  return (
    <View style={[commonStyles.center, commonStyles.red]} onLayout={() => {}}>
      <View>
        <Svg width={SVGWIDTH * 2} height={SVGHEIGHT * 2}>
          <G translateX={SVGWIDTH} translateY={SVGHEIGHT}>
            {/* Clock Area */}
            <Circle r={R} stroke="black" strokeWidth={3} />
            {/* Center DOT */}
            <Circle r={CR} fill="white" />
            {/* Hr, Min, Sec Ticks */}
            {new Array(MIN).fill(0).map((_, index) => {
              const {x, y} = polar2Cartesian({
                theta: ticksMin(index),
                radius: R - 10,
              });
              return (
                <G x={x} y={y} key={`${index}-dots`}>
                  <Circle r={CR * 0.2} fill={'white'} />
                </G>
              );
            })}
            {/* Hr */}
            {new Array(HR).fill(0).map((_, index) => {
              const {x, y} = polar2Cartesian({
                theta: ticksHr(index),
                radius: R - 5,
              });
              const {x: x2, y: y2} = polar2Cartesian({
                theta: ticksHr(index),
                radius: R - 25,
              });

              return (
                <Line
                  key={`line-${index}`}
                  x1={x}
                  x2={x2}
                  y1={y}
                  y2={y2}
                  stroke={'white'}
                  fill={'white'}
                  strokeWidth={CR / 2}
                />
              );
            })}
            {/* Label */}
            {HR_LABEL.map((item, index) => {
              const {x, y} = polar2Cartesian({
                theta: labelsHR(index),
                radius: R - 40,
              });

              return (
                <Text
                  x={x}
                  y={y}
                  fill={'white'}
                  textAnchor="middle"
                  translateY={20 * 0.35}
                  fontSize={20}>
                  {item}
                </Text>
              );
            })}
          </G>
        </Svg>
        <View style={[styles.handContainer]}>
          <Animated.View style={[styles.minHand, minStyle]} />
          <Animated.View style={[styles.hrHand, hrStyle]} />
          <Animated.View style={[styles.secHand, secStyle]} />
        </View>
        <Svg style={[styles.handContainer]}>
          <G translateX={SVGWIDTH} translateY={SVGHEIGHT}>
            <Circle r={CR} fill="white" />
          </G>
        </Svg>
      </View>
      {/* <WrapperWithoutFeedback onPress={moveAnimation}>
        <View style={{padding: 10, backgroundColor: 'red'}} />
      </WrapperWithoutFeedback> */}
    </View>
  );
}

const styles = StyleSheet.create({
  hrHand: {
    width: HR_WIDTH,
    backgroundColor: 'white',
    height: HR_HAND_HEIGHT,
    top: -HR_HAND_HEIGHT,
    left: -HR_WIDTH / 2,
    borderRadius: 10,
  },
  minHand: {
    width: MIN_WIDTH,
    backgroundColor: 'white',
    height: MIN_HAND_HEIGHT,
    position: 'absolute',
    top: -MIN_HAND_HEIGHT,
    left: -MIN_WIDTH / 2,
    borderRadius: 10,
  },
  secHand: {
    width: SEC_WIDTH,
    backgroundColor: 'white',
    height: SEC_HAND_HEIGHT,
    position: 'absolute',
    left: -SEC_WIDTH / 2,
    top: -SEC_HAND_HEIGHT * 0.75,
    borderRadius: 10,
    // top: -MIN_HAND_HEIGHT,
    // left: -MIN_WIDTH / 2,
  },
  handContainer: {
    ...StyleSheet.absoluteFillObject,
    width: SVGWIDTH * 2,
    height: SVGHEIGHT * 2,
  },
});
