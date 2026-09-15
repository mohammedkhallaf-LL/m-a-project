import { useState } from "react";
import toast from "react-hot-toast";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { UserForm, type UserFormValues } from "../components/UserForm";
import { formatLastLogin } from "../lib/format";
import type { User } from "../types";

function nextId(users: User[]): string {
  const max = users.reduce((m, u) => {
    const n = Number(u.id.replace("usr-", ""));
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return `usr-${String(max + 1).padStart(3, "0")}`;
}

export function Users({ users, onChange }: { users: User[]; onChange: (users: User[]) => void }) {
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
      toast.success(`${created.name} added`);
    } else if (editing) {
      const target = editing;
      onChange(users.map((u) => (u.id === target.id ? { ...u, ...values } : u)));
      toast.success(`${values.name} updated`);
    }
    setEditing(null);
  }

  function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    onChange(users.filter((u) => u.id !== pendingDelete.id));
    toast.success(`${pendingDelete.name} deleted`);
    setPendingDelete(null);
  }

  return (
    <main className="page" data-testid="users-page">
      <div className="card">
        <div className="table-toolbar">
          <div>
            <h2 className="card__title">Users</h2>
            <p className="card__subtitle">{users.length} people</p>
          </div>
          <button
            type="button"
            className="btn btn--primary"
            data-testid="user-create"
            onClick={() => setEditing("new")}
          >
            + New user
          </button>
        </div>

        <div className="table-scroll">
          <table className="table" data-testid="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Status</th>
                <th>Last login</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} data-testid="user-row" data-user-id={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
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
                      {u.status}
                    </span>
                  </td>
                  <td>{formatLastLogin(u.lastLoginAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--secondary"
                      data-testid="user-edit"
                      onClick={() => setEditing(u)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn--danger"
                      data-testid="user-delete"
                      onClick={() => setPendingDelete(u)}
                    >
                      Delete
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
          title="Delete user"
          body={`Remove ${pendingDelete.name}? This can't be undone.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </main>
  );
}
