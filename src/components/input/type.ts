import {
  ImageSourcePropType,
  TextInputProps,
  TextStyle,
  ImageStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {ContainerViewStyles, HasChild} from '../../types';

interface InputProps extends TextInputProps {
  action?: ImageSourcePropType | 'password';
  actionStyles?: ImageStyle;
  textInputStyle?: StyleProp<TextStyle>;
  containerStyle?: ViewStyle | ViewStyle[];
  secureTextEntry?: boolean;
  prefix?: React.ReactElement;
  loader?: boolean;
  onChangeValue: (name: string, text: string) => void;
  name: string;
  value: string;
  actionButtonClick?: () => void;
}

interface PressableDatePickerProps
  extends HasChild,
    Partial<ContainerViewStyles> {
  value: string | Date;
  onValueChange: (date: Date | string) => void;
  maximumDate?: Date | undefined;
  minimumDate?: Date | undefined;
}

interface TimePickerMainProps extends HasChild {
  value: string | Date;
  onValueChange: (date: Date | string) => void;
}

export type {InputProps, PressableDatePickerProps, TimePickerMainProps};
