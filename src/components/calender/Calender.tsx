import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Months from './Month';
import TopBar from './TopBar';
import Weeks from './Weeks';
import {getFullYear, getMonth} from './calHepler';
import {commonStyles} from '../../utility/commonStyles';

export default function Calender() {
  const today = new Date();
  const maxYear = getFullYear(today);
  const maxMonth = getMonth(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedYear = getFullYear(selectedDate);
  const selectedMonth = getMonth(selectedDate);

  const decreaseMonth = () =>
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, 1));

  const increaseMonth = () => {
    if (selectedYear >= maxYear && selectedMonth >= maxMonth) {
      return false;
    }
    setSelectedDate(new Date(selectedYear, selectedMonth + 1, 1));
  };

  return (
    <View style={[styles.container]}>
      <View style={[commonStyles.pH15]}>
        <TopBar
          date={selectedDate}
          increaseMonth={increaseMonth}
          decreaseMonth={decreaseMonth}
        />
        <Weeks />
        <Months date={selectedDate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
