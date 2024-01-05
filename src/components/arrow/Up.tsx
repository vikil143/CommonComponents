import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {AppIcons} from '../../../assets';
import {ImageStyles} from '../../types';

interface UpArrowProps extends Partial<ImageStyles> {}

export default function Up({imageStyle}: UpArrowProps) {
  return (
    <Image
      style={[styles.image, imageStyle]}
      source={AppIcons.side_arrow}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 10,
    height: 10,
    transform: [{rotate: '-90deg'}],
  },
});
