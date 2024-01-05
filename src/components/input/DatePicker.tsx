import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import WrapperWithoutFeedback from '../../components/button/WrapperWithoutFeedback';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {isAndroid} from '../../utility/helper';
import {HasChild} from '../../types';

interface DatePickerProps extends HasChild {
  value: string;
  onValueChange: (date: Date | string) => void;
  maximumDate?: Date | undefined;
  minimumDate?: Date | undefined;
}

export default function DatePicker({
  children,
  onValueChange,
  value,
  ...props
}: DatePickerProps) {
  const [modal, setModal] = useState(false);
  // const [selectedDate, setSelectedDate] = useState('');

  // const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  const showModal = () => console.log('Pressed');
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
      <WrapperWithoutFeedback onPress={showModal}>
        {React.cloneElement(children, {value})}
      </WrapperWithoutFeedback>

      {modal && isAndroid() ? (
        <DateTimePicker
          value={getDefaultDate()}
          mode={'date'}
          display="calendar"
          // onChange={(_, __) => onChange(_, __)}
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
