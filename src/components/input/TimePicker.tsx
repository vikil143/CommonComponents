import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import WrapperWithoutFeedback from '../../components/button/WrapperWithoutFeedback';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {TimePickerMainProps} from './type';
import {isAndroid} from '../../utility/helper';

export default function TimePicker({
  children,
  value,
  onValueChange,
}: TimePickerMainProps) {
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
      <WrapperWithoutFeedback onPress={showModal}>
        {children}
      </WrapperWithoutFeedback>

      {modal && isAndroid() ? (
        <DateTimePicker
          value={getDefaultDate()}
          mode={'time'}
          display="clock"
          onChange={onChange}
        />
      ) : (
        <View style={[styles.container]} />
        // <IosTimePicker
        //     show={modal}
        //     hide={() => setModal(false)}
        //     value={getDefaultDate()}
        //     onChange={onValueChange}
        // />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
