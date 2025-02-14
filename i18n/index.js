import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import engTranslation from './locales/en/translation.json';
import arabicTranslation from './locales/ar/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: engTranslation
        },
        ar: {
            translation: arabicTranslation
        },
    },
    fallbackLng: 'en',
    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false
    }
});

export default i18n;