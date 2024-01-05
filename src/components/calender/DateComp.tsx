import {StyleSheet, Text, View, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
// import {Colors} from '@myapp/utilities/Colors';
import {DATE_WIDTH} from './constants';
import {Colors} from '../../utility/Colors';
// import {typography} from '@myapp/utilities/typography';

interface DateProps {
  date: number;
  notAnCurrentMonth?: boolean;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function DateComp({
  date,
  notAnCurrentMonth = false,
  viewStyle,
  textStyle,
}: DateProps) {
  return (
    <View
      style={[
        styles.container,
        viewStyle,
        notAnCurrentMonth && styles.notCurrentMonth,
      ]}>
      <Text
        style={[
          styles.date,
          textStyle,
          notAnCurrentMonth && styles.notCurrentMonthText,
        ]}>
        {date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notCurrentMonth: {
    backgroundColor: Colors.otherMonth,
  },
  notCurrentMonthText: {
    // opacity: 0.4
    color: '#c8c6c6',
  },
  date: {
    color: Colors.black,
    fontSize: 16,
    // textDecorationLine: "underline"
  },
  container: {
    width: Math.floor(DATE_WIDTH),
    height: Math.floor(DATE_WIDTH * 0.75),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
