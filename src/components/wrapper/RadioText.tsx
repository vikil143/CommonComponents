import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HighlightedButton from '../button/Highlighted';
import {Colors} from '../../utility/Colors';
import Radio from '../button/Radio';
import Spacing from '../spacing/Spacing';
// import {commonStyles} from '@myapp/utilities/commonStyles';
// import {HighlightedButton, RadioButton} from '../button';
// import {Spacing} from '../spacing';
// import {Colors} from '@myapp/utilities/Colors';

interface RadioTextProps {
  name: string;
  reference: string;
  onPress: (reference: string) => void;
  value: boolean;
}

export default function RadioText({
  name,
  onPress,
  reference,
  value,
}: RadioTextProps) {
  const handleButtonPress = () => onPress(reference);

  return (
    <HighlightedButton underlayColor={Colors.grey} onPress={handleButtonPress}>
      <View style={[styles.container]}>
        <View pointerEvents="none">
          <Radio selected={value} onPress={() => {}} />
        </View>
        <Spacing size={5} />
        <Text>{name}</Text>
      </View>
    </HighlightedButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 19,
    paddingVertical: 7,
  },
});
