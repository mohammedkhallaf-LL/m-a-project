import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
// ./module-augmentation.d.ts is a TypeScript ambient declaration (no
// runtime output) — TS picks it up automatically via tsconfig's `include`,
// so it must not be imported here; doing so broke the Rollup/Vite build
// since bundlers can't resolve a .d.ts as a real module.

export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Native name for each language, always shown in its own language so a
 * reader can find their language regardless of the UI's current one. */
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "Français",
};

/** BCP47 tag for `Intl`/`toLocaleDateString` calls — dates aren't pinned by
 * the acceptance contract, so they follow the active UI language. */
export function dateLocale(lang: string): string {
  return lang === "fr" ? "fr-FR" : "en-US";
}

const STORAGE_KEY = "pulseboard.lang";

function isSupported(value: string): value is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

function detectLanguage(): SupportedLanguage {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall through.
  }
  const browserLang = window.navigator.language.slice(0, 2);
  return isSupported(browserLang) ? browserLang : "en";
}

/**
 * Translations are static JSON under `public/locales/<lng>/translation.json`
 * (i18next-http-backend's default layout), fetched at runtime rather than
 * bundled — so adding a language or fixing a string doesn't need a rebuild.
 * `main.tsx` awaits this before rendering, so components never see an
 * empty/loading translation state.
 */
export const i18nReady = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: detectLanguage(),
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    // Both bundles are fetched up front so switching language is instant.
    preload: [...SUPPORTED_LANGUAGES],
    // This app has no <Suspense> boundary; without this, changeLanguage()
    // suspends the whole tree mid-fetch and the page goes blank.
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
  })
  .then(() => {
    document.documentElement.lang = i18n.language;
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // localStorage unavailable — language choice just won't persist across reloads.
  }
});

export default i18n;
