import type { TFunction } from "i18next";
import type { AccountStatus, Kpi, Plan, UserRole, UserStatus } from "../types";

/**
 * Display labels for closed enums. Filtering/sorting always compares the
 * raw (English) data values in `types.ts` — only the rendered text changes
 * with language.
 */
const ACCOUNT_STATUS_KEY: Record<AccountStatus, string> = {
  Active: "active",
  Trial: "trial",
  "At risk": "atRisk",
  Churned: "churned",
};

const USER_STATUS_KEY: Record<UserStatus, string> = {
  Active: "active",
  Invited: "invited",
  Suspended: "suspended",
};

const USER_ROLE_KEY: Record<UserRole, string> = {
  Admin: "admin",
  Manager: "manager",
  Viewer: "viewer",
};

const PLAN_KEY: Record<Plan, string> = {
  Starter: "starter",
  Growth: "growth",
  Enterprise: "enterprise",
};

/**
 * `t()`'s key type is a literal union derived from the English resource
 * (see `src/i18n/module-augmentation.ts`), so a template-built key needs an
 * escape hatch — the union of possible keys is still exhaustively checked
 * via the `Record<..., string>` maps above, just not by `t()`'s own types.
 */
export function translateKey(t: TFunction, key: string, defaultValue?: string): string {
  return t(key as never, defaultValue === undefined ? undefined : ({ defaultValue } as never));
}

export function accountStatusLabel(t: TFunction, status: AccountStatus): string {
  return translateKey(t, `enums.accountStatus.${ACCOUNT_STATUS_KEY[status]}`);
}

export function userStatusLabel(t: TFunction, status: UserStatus): string {
  return translateKey(t, `enums.userStatus.${USER_STATUS_KEY[status]}`);
}

export function userRoleLabel(t: TFunction, role: UserRole): string {
  return translateKey(t, `enums.userRole.${USER_ROLE_KEY[role]}`);
}

export function planLabel(t: TFunction, plan: Plan): string {
  return translateKey(t, `enums.plan.${PLAN_KEY[plan]}`);
}

/** KPI labels live in the dataset; translate by `id` and fall back to the
 * dataset's own label so a KPI added to data.json still renders. */
export function kpiLabel(t: TFunction, kpi: Kpi): string {
  return translateKey(t, `kpi.labels.${kpi.id}`, kpi.label);
}
