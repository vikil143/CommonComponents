import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Input from './Input';
import {InputProps} from './type';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';

interface SearchProps extends InputProps {
  rootStyles?: ViewStyle;
}

export default function Search({
  rootStyles,
  name,
  value,
  onChangeValue,
  ...props
}: SearchProps) {
  //   const searchIcon = (
  //     <View style={[styles.searchContainer]}>
  //       <ImageWrapper source={AppIcons.search} />
  //     </View>
  //   );

  return (
    <View style={[commonStyles.pH15, rootStyles]}>
      <Input
        // prefix={searchIcon}
        name={name}
        value={value}
        onChangeValue={onChangeValue}
        containerStyle={[styles.searchInput]}
        textInputStyle={styles.textInputStyle}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 7,
  },
  searchInput: {
    borderColor: Colors.grey,
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
  searchContainer: {
    paddingLeft: 10,
  },
});
