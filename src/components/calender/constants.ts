import {SCREEN_WIDTH} from '../../utility/constants';

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const FULLMONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const WEEKS = ['MON', 'TUE', 'WED', 'THUS', 'FRI', 'SAT', 'SUN'];
export const noOfWeekinMonth = 5;
export const SIDE_SPACE = 30;
export const DATE_WIDTH = (SCREEN_WIDTH - SIDE_SPACE) / WEEKS.length;
export const DATE_MIN_HEIGHT = (SCREEN_WIDTH - SIDE_SPACE) / noOfWeekinMonth;
export const SNAP_WIDTH = DATE_WIDTH * WEEKS.length;
