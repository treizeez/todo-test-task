import I18n, { TOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@root/i18n/en";

I18n.use(initReactI18next).init({
  resources: {
    en,
  },
  lng: "en",
  fallbackLng: "en",
});

const translate = (key: string, options?: TOptions) => {
  return I18n.t(key, options);
};

export { translate };

export default I18n;
