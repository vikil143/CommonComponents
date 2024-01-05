import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  I18nManager,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import Spacing from '../spacing/Spacing';
import {InputProps} from './type';
import {Colors} from '../../utility/Colors';
import {AppIcons} from '../../../assets';
import {commonStyles} from '../../utility/commonStyles';
// import colors from '../utils/colors';
// import commonStyles from '../utils/commonStyles';

// interface InputProps extends Partial<TextInputProps> {
//     action?: ImageSourcePropType | 'password';
//     actionStyles?: ImageStyle;
//     textInputStyle?: StyleProp<TextStyle>;
//     containerStyle?: ViewStyle | ViewStyle[];
//     secureTextEntry?: boolean;
//     prefix?: React.ReactElement;
//     loader?: boolean;
//     onChangeValue: (name: string, text: string) => void;
//     name: string;
//     value: string;
//     actionButtonClick?: () => void;
// }

const Input = ({
  action,
  actionStyles,
  textInputStyle,
  containerStyle,
  secureTextEntry,
  prefix,
  name,
  value,
  onChangeValue,
  loader = false,
  actionButtonClick,
  placeholderTextColor = Colors.placeholder,
  ...inputProps
}: InputProps) => {
  const [secureText, setSecureText] = useState(secureTextEntry || false);

  const toggleSecureText = () => setSecureText(!secureText);

  const renderCustAction = (actionText: ImageSourcePropType | 'password') => {
    switch (actionText) {
      case 'password': {
        return (
          <TouchableWithoutFeedback onPress={toggleSecureText}>
            {secureText ? (
              <Image
                style={[styles.actionStyles, actionStyles]}
                source={AppIcons.password_secure}
                resizeMode="contain"
              />
            ) : (
              <Image
                style={[
                  styles.actionStyles,
                  styles.actionTintColor,
                  actionStyles,
                ]}
                source={AppIcons.password_show_grey}
                resizeMode="contain"
              />
            )}
          </TouchableWithoutFeedback>
        );
      }
      default: {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              if (typeof actionButtonClick === 'function') {
                actionButtonClick();
              }
            }}>
            <Image
              source={action as ImageSourcePropType}
              style={[styles.actionStyles, actionStyles]}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        );
      }
    }
  };

  return (
    <View
      style={[
        commonStyles.rowBetween,
        styles.container,
        containerStyle,
        Platform.OS === 'ios' ? styles.pV12 : null,
      ]}>
      {!!prefix && prefix}
      <TextInput
        style={[styles.textInput, textInputStyle]}
        secureTextEntry={secureText}
        value={value}
        // value=""
        onChangeText={text => onChangeValue(name, text)}
        placeholderTextColor={placeholderTextColor}
        {...inputProps}
      />
      {!!action && (
        <>
          <View style={[commonStyles.row]}>
            {renderCustAction(action)}
            <Spacing size={8} />
          </View>
        </>
      )}
      {loader && (
        <>
          <Spacing size={3} />
          <ActivityIndicator />
          <Spacing size={3} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pV12: {paddingVertical: 12},
  placeholderWrapper: {
    position: 'absolute',
    left: 10,
  },
  placeholderText: {
    color: '#B6B6B6',
  },
  actionTintColor: {
    tintColor: '#aaa',
  },
  actionStyles: {
    width: 23,
    height: 23,
  },
  textInput: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: Colors.black,
  },
  container: {
    borderWidth: 1,
    // borderColor: '#B6B6B6',
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default React.memo(Input);
