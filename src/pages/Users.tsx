import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { UserForm, type UserFormValues } from "../components/UserForm";
import { formatLastLogin } from "../lib/format";
import { dateLocale } from "../i18n";
import { userRoleLabel, userStatusLabel } from "../lib/labels";
import type { User } from "../types";

function nextId(users: User[]): string {
  const max = users.reduce((m, u) => {
    const n = Number(u.id.replace("usr-", ""));
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return `usr-${String(max + 1).padStart(3, "0")}`;
}

export function Users({ users, onChange }: { users: User[]; onChange: (users: User[]) => void }) {
  const { t, i18n } = useTranslation();
  const locale = dateLocale(i18n.language);
  const [editing, setEditing] = useState<User | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  function handleSave(values: UserFormValues) {
    if (editing === "new") {
      const created: User = {
        id: nextId(users),
        name: values.name,
        email: values.email,
        role: values.role,
        team: values.team,
        status: "Invited",
        createdAt: new Date().toISOString(),
        lastLoginAt: null,
      };
      onChange([...users, created]);
      toast.success(t("users.toastAdded", { name: created.name }));
    } else if (editing) {
      const target = editing;
      onChange(users.map((u) => (u.id === target.id ? { ...u, ...values } : u)));
      toast.success(t("users.toastUpdated", { name: values.name }));
    }
    setEditing(null);
  }

  function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    onChange(users.filter((u) => u.id !== pendingDelete.id));
    toast.success(t("users.toastDeleted", { name: pendingDelete.name }));
    setPendingDelete(null);
  }

  return (
    <main className="page" data-testid="users-page">
      <div className="card">
        <div className="table-toolbar">
          <div>
            <h2 className="card__title">{t("users.title")}</h2>
            <p className="card__subtitle">{t("users.subtitle", { count: users.length })}</p>
          </div>
          <button
            type="button"
            className="btn btn--primary"
            data-testid="user-create"
            onClick={() => setEditing("new")}
          >
            {t("users.newUser")}
          </button>
        </div>

        <div className="table-scroll">
          <table className="table" data-testid="users-table">
            <thead>
              <tr>
                <th>{t("users.columns.name")}</th>
                <th>{t("users.columns.email")}</th>
                <th>{t("users.columns.role")}</th>
                <th>{t("users.columns.team")}</th>
                <th>{t("users.columns.status")}</th>
                <th>{t("users.columns.lastLogin")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} data-testid="user-row" data-user-id={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{userRoleLabel(t, u.role)}</td>
                  <td>{u.team}</td>
                  <td>
                    <span
                      className={`pill ${
                        u.status === "Active"
                          ? "pill--success"
                          : u.status === "Invited"
                            ? "pill--info"
                            : "pill--danger"
                      }`}
                    >
                      {userStatusLabel(t, u.status)}
                    </span>
                  </td>
                  <td>{formatLastLogin(u.lastLoginAt, locale, t("users.never"))}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--secondary"
                      data-testid="user-edit"
                      onClick={() => setEditing(u)}
                    >
                      {t("users.edit")}
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn--danger"
                      data-testid="user-delete"
                      onClick={() => setPendingDelete(u)}
                    >
                      {t("users.delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <UserForm
          user={editing === "new" ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={t("users.confirmDeleteTitle")}
          body={t("users.confirmDeleteBody", { name: pendingDelete.name })}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </main>
  );
}
