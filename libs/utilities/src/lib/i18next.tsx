import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import deutsch from "./locales/de/translation.json";
import english from "./locales/en/translation.json";
import french from "./locales/fr/translation.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    fr: {
      translation: french,
    },
    de: {
      translation: deutsch,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
