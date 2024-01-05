import {StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import DateComp from './DateComp';
import {
  getFormattedDate,
  getFullYear,
  getLastDate,
  getMonth,
  getWeek,
  normalizeWeekNumber,
} from './calHepler';
// import {Colors} from '@myapp/utilities/Colors';
import {WEEKS} from './constants';
import {apiDates} from './data';
import {Colors} from '../../utility/Colors';

interface OtherMonthsProps {
  dates: number[];
  offset: number;
}

function OtherMonths({dates, offset}: OtherMonthsProps) {
  const getCurrentViewStyle = (/* date: Date index: number */): ViewStyle => {
    return {
      // borderRightWidth: (index + 1) % 7 === 0 ? 1 : 0,
    };
  };

  return (
    <>
      {dates.map((_, index) => {
        return (
          <DateComp
            key={index}
            date={offset + index}
            notAnCurrentMonth
            viewStyle={getCurrentViewStyle()}
          />
        );
      })}
    </>
  );
}

interface CurrentMonthDatesProps {
  dates: number[];
  offset: number;
  month: number;
  year: number;
}

function CurrentMonthDates({
  dates,
  offset,
  year,
  month,
}: CurrentMonthDatesProps) {
  const getCurrentViewStyle = (date: Date): ViewStyle => {
    // console.log('Date', getFormattedDate(date));
    return {
      backgroundColor:
        Colors[apiDates[getFormattedDate(date)]] ?? Colors.absent,
    };
  };

  const getCurrentTextStyle = (/*date: Date*/): TextStyle => {
    return {
      color: Colors.black,
    };
  };

  return (
    <>
      {dates.map((_, index) => {
        return (
          <DateComp
            key={index}
            date={offset + index}
            viewStyle={getCurrentViewStyle(
              new Date(year, month, index + offset),
            )}
            textStyle={
              getCurrentTextStyle()
              // new Date(year, month, index + offset),
            }
          />
        );
      })}
    </>
  );
}

interface MonthsProps {
  date: Date;
}

export default function Months({date}: MonthsProps) {
  const year = getFullYear(date);
  const month = getMonth(date);
  const currentMonthLastDate = getLastDate(date).getDate();
  const lastMonthLastDate = getLastDate(new Date(year, month, 0)).getDate();
  // Below week minus by 1 so its adjust for monday
  // ===============================Ignore below comment========================================
  // Increased by one number so week get match with respective values so increament start with 1
  // ===========================================================================================
  const currentStartWeek = normalizeWeekNumber(
    getWeek(new Date(year, month, 1)) - 1,
  );

  const currentLastWeek =
    normalizeWeekNumber(getWeek(new Date(year, month + 1, 0)) - 1) + 1;

  return (
    <View style={[styles.dateContainer]}>
      <OtherMonths
        dates={Array.from({length: currentStartWeek})}
        offset={lastMonthLastDate - currentStartWeek + 1}
        // Below param for week last border

        // weekEndBorderAdjust={0}
      />
      <CurrentMonthDates
        dates={Array.from({length: currentMonthLastDate})}
        offset={1}
        {...{month, year}}
        // Below param for week last border
        // weekEndBorderAdjust={currentStartWeek}
      />
      <OtherMonths
        dates={Array.from({length: WEEKS.length - currentLastWeek})}
        offset={1}
        // weekEndBorderAdjust={currentLastWeek}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width: DATE_WIDTH * WEEKS.length,
  },
});
