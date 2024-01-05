import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {ImageStyles} from '../../types';
import {AppIcons} from '../../../assets';

interface DownArrowProps extends Partial<ImageStyles> {}

export default function DownArrow({imageStyle}: DownArrowProps) {
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
    transform: [{rotate: '90deg'}],
  },
});
