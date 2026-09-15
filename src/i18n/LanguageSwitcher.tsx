import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "./index";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="lang-toggle" role="group" aria-label={t("language.label")}>
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          className="lang-toggle__option"
          data-testid={`language-${lng}`}
          aria-pressed={i18n.language === lng}
          onClick={() => void i18n.changeLanguage(lng as SupportedLanguage)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
