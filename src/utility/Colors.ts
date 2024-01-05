import {ColorValue} from 'react-native';

interface ColorsInterface {
  [color: string]: ColorValue;
}

export const Colors: ColorsInterface = {
  clientDetail: '#253844',
  cameraShadow: '#1c3753',
  cameraCaputer: '#3a5e8e',
  cameraFooter: '#061c2a',
  white: '#fff',
  black: '#000',
  forgetPassword: '#3A5E8E',
  forgetBG: '#f5f7f9',
  primary: '#061C2A',
  red: '#EE3F27',
  grey: '#DBD8D8',
  inputGrey: '#eeeeee',
  totalDays: '#fff5d5',
  totalDaysBorder: '#ffeaa6',
  presentDays: '#ffd4d4',
  presentDaysBorder: '#fdb8b8',
  leaveDays: '#cefaff',
  leaveDaysBorder: '#a6f6ff',
  absent: '#cdfed0',
  absentBorder: '#a4fcaa',
  yellow: '#ffc978',
  greyCal: '#edf0f5',
  otherMonth: '#f0eeee',
  loginColor: '#6389b9',
  sideCardColor: '#f0f3f5',
  placeholder: '#828d94',
  darkBlue: '#395d8c',
  progressIndicatorColor: '#e7eaed',
  lightGrey: 'rgba(221, 221, 221, 0.5)',
  success: '#4BB543',
  danger: '#bb2124',
};
