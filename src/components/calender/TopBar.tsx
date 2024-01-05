import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {getFullYear, getMonth} from './calHepler';
import {FULLMONTHS} from './constants';
import {ViewStyles} from '../../types';
import {Colors} from '../../utility/Colors';
import Spacing from '../spacing/Spacing';
import {commonStyles} from '../../utility/commonStyles';
import HighlightedButton from '../button/Highlighted';
import StyleWrapper from '../wrapper/Style';
import {AppIcons} from '../../../assets';
// import {Colors} from '@myapp/utilities/Colors';
// import {commonStyles} from '@myapp/utilities/commonStyles';
// import {AppIcons} from '@myassets/index';
// import {ViewStyles} from '@myapp/types';
// import {Spacing} from '../spacing';
// import {HighlightedButton} from '../button';
// import {StyleWrapper} from '../wrapper';

interface ArrowProps extends Partial<ViewStyles> {}

function ArrowIcon({style}: ArrowProps) {
  return (
    <View style={[style]}>
      <Image
        style={[styles.arrow]}
        source={AppIcons.downArrow}
        resizeMode="contain"
      />
    </View>
  );
}

interface TopBarProps {
  date: Date;
  increaseMonth: () => void;
  decreaseMonth: () => void;
}

export default function TopBar({
  date,
  increaseMonth,
  decreaseMonth,
}: TopBarProps) {
  const currentMonth = FULLMONTHS[getMonth(date)];
  const currentYear = getFullYear(date);

  return (
    <View style={[styles.container, commonStyles.rowAlignCenter]}>
      <View style={[commonStyles.flexOne]}>
        <Text style={[commonStyles.primaryColor]}>
          {currentMonth} {currentYear}
        </Text>
      </View>
      <HighlightedButton underlayColor={Colors.grey} onPress={increaseMonth}>
        <StyleWrapper padding={5}>
          <ArrowIcon style={styles.upArrow} />
        </StyleWrapper>
      </HighlightedButton>
      <Spacing size={5} />
      <HighlightedButton underlayColor={Colors.grey} onPress={decreaseMonth}>
        <StyleWrapper padding={5}>
          <ArrowIcon />
        </StyleWrapper>
      </HighlightedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  upArrow: {
    transform: [{rotate: '180deg'}],
  },
  arrow: {
    width: 15,
    height: 15,
  },
  container: {
    borderWidth: 1,
    borderColor: Colors.greyCal,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.greyCal,
  },
});
