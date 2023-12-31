import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {OnPress} from '../../types';
import {Colors} from '../../utility/Colors';

interface ButtonProps extends OnPress {
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle | ViewStyle[];
}

export default function Button({
  containerStyle,
  text,
  textStyle,
  onPress,
}: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      <View style={[]}>
        <Text style={[styles.textStyles, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
  },
  container: {
    padding: 8,
    borderRadius: 8,
  },
});
