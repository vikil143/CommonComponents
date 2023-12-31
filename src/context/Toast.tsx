import React, {createContext} from 'react';
import {StyleSheet, ColorValue} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {ToastTypes, TYPE} from './types';
import {Colors} from '../utility/Colors';
import {HasChild} from '../types';
// import Colors from './colors';

export const ToastContext = createContext<ToastTypes>({
  showToast: () => {},
});

interface ToastProps {
  message: string;
  show: boolean;
  type: TYPE;
}

function Toast({message, show, type}: ToastProps) {
  const animatedValue = useDerivedValue(() => {
    const animatedTo = show ? 1 : 0;
    return withTiming(animatedTo, {duration: 500});
  }, [show]);

  const style = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [0, 1],
      [150, 0],
      'clamp',
    );
    return {
      transform: [{translateY}],
      opacity: animatedValue.value,
      backgroundColor: type === 'success' ? Colors.success : Colors.danger,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: Colors.white,
    };
  });

  return (
    <Animated.View style={[styles.toast, style]}>
      <Animated.Text style={[styles.toastText, textStyle]}>
        {message}
      </Animated.Text>
    </Animated.View>
  );
}

interface ToastWrapperProps extends HasChild {}

interface ToastWrapperState {
  message: string;
  show: boolean;
  // color: ColorValue;
  textColor: ColorValue;
  type: TYPE;
}

class ToastWrapper extends React.Component<
  ToastWrapperProps,
  ToastWrapperState
> {
  constructor(props: ToastWrapperProps) {
    super(props);
    this.state = {
      message: "You're already login!!",
      show: false,
      type: 'success',
      // color: Colors.success,
      textColor: Colors.white,
    };
    this.timeout;
  }
  timeout?: NodeJS.Timeout;

  showToast = (message: string, type?: TYPE, duration = 3000) => {
    this.setState({message, type: type ?? 'success', show: true}, () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.setState({show: false});
      }, duration);
    });
  };

  render() {
    // toast state
    const {message, show, type} = this.state;
    return (
      <ToastContext.Provider value={{showToast: this.showToast}}>
        {this.props.children}
        <Toast {...{message, show, type}} />
      </ToastContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  toastText: {
    textAlign: 'left',
  },
  toast: {
    padding: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
  },
});

export default ToastWrapper;
