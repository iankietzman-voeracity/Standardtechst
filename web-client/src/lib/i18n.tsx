import i18n from "i18next";
import HttpApi, { HttpBackendOptions }  from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    ns: ["common"],
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export const languages = [
  {languageCode: 'en', language: 'English'},
  {languageCode: 'es', language: 'Español'},
]

export default i18n