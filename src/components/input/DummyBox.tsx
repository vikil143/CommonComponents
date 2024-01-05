import {StyleSheet, View, Text, TextStyle} from 'react-native';
import React from 'react';
import {ContainerViewStyles, ViewStyles} from '../../types';
import {commonStyles} from '../../utility/commonStyles';
import {formatDateDDMMYYYY} from '../../utility/helper';
import {Colors} from '../../utility/Colors';

interface DummyBoxProps
  extends Partial<ContainerViewStyles>,
    Partial<ViewStyles> {
  prefix?: React.ReactElement;
  action?: React.ReactElement;
  placeholder?: string;
  value?: string | Date;
  textStyle?: TextStyle | TextStyle[];
}

export default function DummyBox({
  prefix,
  action,
  style,
  containerStyle,
  placeholder,
  value,
  textStyle,
}: DummyBoxProps) {
  console.log('Date', value);
  return (
    <View style={[styles.container, containerStyle]}>
      {!!prefix && prefix}
      <View style={[commonStyles.flexOne, style]}>
        <Text style={[styles.placeholder, textStyle]}>
          {value
            ? formatDateDDMMYYYY(new Date(value))
            : placeholder
            ? placeholder
            : ''}
        </Text>
      </View>
      {!!action && action}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 14,
    color: '#707070',
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 11,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
