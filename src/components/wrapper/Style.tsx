import {View} from 'react-native';
import React from 'react';
import {HasChild, PaddingMarginProps, ViewStyles} from '../../types';
// import {hasChild, PaddingMarginProps, ViewStyles} from '@myapp/types';

interface StyleProps
  extends Partial<ViewStyles>,
    HasChild,
    Partial<PaddingMarginProps> {}

export default function StyleWrapper({
  padding,
  margin,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,
  style,
  children,
  marginHorizontal,
  marginVertical,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
}: StyleProps) {
  return (
    <View
      style={[
        style,
        {
          padding,
          paddingHorizontal,
          paddingVertical,
          margin,
          marginHorizontal,
          marginVertical,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom,
          marginLeft,
          marginRight,
          marginBottom,
          marginTop,
        },
      ]}>
      {children}
    </View>
  );
}
