import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import fr from './fr';

const LANGUAGES = {
    en,
    fr,
};

// const LANG_CODES = Object.keys(LANGUAGES);

// const LANGUAGE_DETECTOR = {
//     type: 'languageDetector',
//     async: true,
//     detect: () => {},
//     // detect: callback => {
//     //   AsyncStorage.getItem('user-language', (err, language) => {
//     //     // if error fetching stored data or no language was stored
//     //     // display errors when in DEV mode as console statements
//     //     if (err || !language) {
//     //       if (err) {
//     //         console.log('Error fetching Languages from asyncstorage ', err);
//     //       } else {
//     //         console.log('No language is set, choosing English as fallback');
//     //       }
//     //       const findBestAvailableLanguage =
//     //         RNLocalize.findBestAvailableLanguage(LANG_CODES);

//     //       callback(findBestAvailableLanguage.languageTag || 'en');
//     //       return;
//     //     }
//     //     callback(language);
//     //   });
//     // },
//     init: () => {},
//     // cacheUserLanguage: language => {
//     //   AsyncStorage.setItem('user-language', language);
//     // }
//     cacheUserLanguage: () => {},
// };

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: LANGUAGES,
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

export default i18n;
