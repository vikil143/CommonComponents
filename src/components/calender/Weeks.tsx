import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DATE_WIDTH, WEEKS} from './constants';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
// import {commonStyles} from '@myapp/utilities/commonStyles';
// import {Colors} from '@myapp/utilities/Colors';

interface WeekProps {
  name: string;
  index: number;
}

function Week({name, index}: WeekProps) {
  return (
    <View
      style={[
        styles.week,
        index === 6 ? styles.lastItem : commonStyles.dummyStyle,
      ]}>
      <Text>{name}</Text>
    </View>
  );
}

export default function Weeks() {
  return (
    <View style={[styles.container]}>
      {WEEKS.map((item, index) => (
        <Week name={item} key={item} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lastItem: {
    borderRightWidth: 1,
  },
  week: {
    width: DATE_WIDTH,
    height: DATE_WIDTH * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.greyCal,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
  },
});
