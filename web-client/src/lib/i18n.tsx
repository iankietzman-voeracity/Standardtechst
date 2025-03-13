import i18n from "i18next";
import HttpApi, { HttpBackendOptions }  from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

console.log('yo yo yo');


i18n
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init<HttpBackendOptions>({
    // resources: {
    //   en: {
    //     translation: {
    //       "Welcome to React": "Welcome to React and react-i18next"
    //     }
    //   }
    // },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n