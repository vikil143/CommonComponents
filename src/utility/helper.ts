import {
  Platform,
  Linking,
  Alert,
  Keyboard,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
// import {openInbox} from 'react-native-email-link';

const {width, height} = Dimensions.get('window');

interface ImageOptions extends ImageLibraryOptions {}

export const pickImageFromGallery = async (o: Partial<ImageOptions>) => {
  try {
    const options: ImageLibraryOptions = {
      ...o,
      mediaType: 'photo',
    };
    const image = await launchImageLibrary(options);
    return image;
  } catch (error) {
    throw error;
  }
};

export function formatDateDDMMYYYY(date: Date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return day + '-' + month + '-' + year;
}

export function formatTimeHHMM(time: Date) {
  let hr = time.getHours();
  let min = time.getMinutes();

  return hr + ':' + min;
}

export const widthToDp = (value: number) =>
  PixelRatio.roundToNearestPixel(width * value) / 100;

export const heightToDp = (value: number) =>
  PixelRatio.roundToNearestPixel(height * value) / 100;

export const combineFunctionCallBack = async (
  callBackOne: Function,
  callBackTwo: Function,
) => {
  await callBackOne();
  await callBackTwo();
};

// export const openEmailInbox = () => openInbox();

export const dimissKeyboard = () => Keyboard.dismiss();

export const isAndroid = () => Platform.OS === 'android';

export const isIOS = () => Platform.OS === 'ios';

export const randomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const callToNumber = (num: number | string) =>
  Linking.openURL(`tel:${num}`);

export const openInBrowers = (url: string) => Linking.openURL(url);

export const convertToTwoDigits = (num: number) =>
  num < 10 ? '0'.concat(num.toString()) : num;

export const openMail = () => {
  Linking.canOpenURL('message://')
    .then(supported => {
      if (!supported) {
        Alert.alert('Not Supported', "Can't support open mail in your phone");
        return false;
      } else {
        return Linking.openURL('message:0');
      }
    })
    .catch(err => {
      console.error('An error occurred', err);
    });
};
