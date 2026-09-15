import type en from "../../public/locales/en/translation.json";

/**
 * Types `t()`'s keys (and, via `TFunctionDetailedResult`, its interpolation
 * placeholders) against the shape of the English resource file — the source
 * of truth for every translation key in the app. `src/lib/labels.ts` relies
 * on this: its `translateKey()` escape hatch exists specifically because
 * template-built keys (`enums.plan.${key}`) can't be checked against this
 * literal union, so it casts through `never` and leans on the `Record<...>`
 * maps there for exhaustiveness instead.
 *
 * This file has no runtime output (`.d.ts`) — `src/i18n/index.ts` imports it
 * only for its global augmentation side effect via `import "./module-augmentation"`.
 */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}
