import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  StatusBar,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {HasChild} from '../../types';
import {SCREEN_WIDTH} from '../../utility/constants';
import {useBackHandler} from '../../hooks/useBackHandler';
import {Colors} from '../../utility/Colors';

interface DrawerProps extends HasChild {
  show: boolean;
  hide: () => void;
  onModalHide?: () => void;
  drawerWidth?: number;
  drawerStyle?: ViewStyle | ViewStyle[];
}

function Drawer({
  show,
  hide,
  drawerWidth = SCREEN_WIDTH * 0.75,
  children,
  onModalHide,
  drawerStyle,
}: DrawerProps) {
  const duration = 300;
  const slideAnimation = useDerivedValue(() => {
    const to = show ? 1 : 0;
    return withTiming(to, {duration}, () => {
      // handleModalClose();
      if (!show && typeof onModalHide === 'function') {
        onModalHide();
      }
    });
  }, [show]);
  useBackHandler(show, hide);

  // useImperativeHandle(ref, () => {
  //     return {};
  // });

  // const handleModalClose = () => {};

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        slideAnimation.value,
        [0, 0.2, 1],
        [0, 0, 1],
        'clamp',
      ),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      slideAnimation.value,
      [0, 0.2, 1],
      [0, 1, 1],
      'clamp',
    );
    const translateX = interpolate(
      slideAnimation.value,
      [0, 0.2, 1],
      [-SCREEN_WIDTH, 0, 0],
      'clamp',
    );
    return {
      transform: [{translateX}],
      opacity,
    };
  });
  const animDrawerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            slideAnimation.value,
            [0, 0.2, 1],
            [-drawerWidth, -drawerWidth, 0],
            'clamp',
          ),
        },
      ],
    };
  });

  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles.root]}
      pointerEvents="box-none">
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Animated.View style={[styles.container, containerStyle]}>
        <TouchableWithoutFeedback onPress={hide}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              styles.backDrop,
              backdropStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.drawer,
            {width: drawerWidth},
            drawerStyle,
            animDrawerStyles,
          ]}>
          {React.cloneElement(children, {
            show,
            hide,
            onModalHide,
            duration,
          })}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: Colors.white,
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  root: {
    width: SCREEN_WIDTH,
    height: '100%',
    zIndex: 1000,
  },
});

// export default forwardRef(Drawer);
export default Drawer;
