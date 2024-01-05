import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
import {SCREEN_WIDTH} from '../../utility/constants';

const NO_OF_OTP = 4;

interface OTPProps {
  pin: string;
  setPin?: (text: string) => void;
  hasError?: boolean;
}

function OTP({pin, hasError}: OTPProps) {
  const handleChangePin = (text: string) => {
    if (isNaN(Number(text))) {
      return false;
    }

    if (text.length < 5) {
      //   setPin(text);
    }
  };

  return (
    <View style={[commonStyles.row, styles.spaceArround]}>
      {new Array(NO_OF_OTP).fill(0).map((_, ind) => {
        return (
          <View
            style={[
              styles.pin,
              {
                borderColor: hasError ? Colors.red : Colors.white,
              },
            ]}
            key={ind}>
            <Text style={[styles.pinColor]}>
              {ind < pin.length ? pin[ind] : ''}
            </Text>
          </View>
        );
      })}
      <TextInput
        style={[StyleSheet.absoluteFillObject, styles.textInput]}
        keyboardType="numeric"
        value={pin}
        onChangeText={handleChangePin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    opacity: 0,
  },
  spaceArround: {justifyContent: 'space-around'},
  pinColor: {
    color: Colors.black,
  },
  pin: {
    borderWidth: 1,
    width: (SCREEN_WIDTH - 100) / NO_OF_OTP,
    height: (SCREEN_WIDTH - 100) / NO_OF_OTP,
    backgroundColor: Colors.forgetBG,
    // borderWidth: 1,
    // borderColor: Colors.inputBorderColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(OTP);
