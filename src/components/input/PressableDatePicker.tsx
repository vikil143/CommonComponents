import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {PressableDatePickerProps} from './type';
import {isAndroid} from '../../utility/helper';

export default function PressableDatePicker({
  children,
  containerStyle,
  value,
  onValueChange,
  ...props
}: PressableDatePickerProps) {
  const [modal, setModal] = useState(false);
  // const [selectedDate, setSelectedDate] = useState('');

  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  const onChange = (evt: DateTimePickerEvent, date: Date | undefined) => {
    hideModal();
    if (evt.type !== 'set') {
      return false;
    }
    if (date) {
      onValueChange(new Date(date));
    } else {
      onValueChange('');
    }
  };

  const getDefaultDate = () => {
    if (value !== '') {
      return new Date(value);
    } else {
      return new Date();
    }
  };
  return (
    <>
      <Pressable style={[containerStyle]} onPress={showModal}>
        {React.cloneElement(children, {value})}
      </Pressable>

      {modal && isAndroid() ? (
        <DateTimePicker
          value={getDefaultDate()}
          mode={'date'}
          display="calendar"
          onChange={onChange}
          {...props}
        />
      ) : (
        <View style={[styles.container]} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
