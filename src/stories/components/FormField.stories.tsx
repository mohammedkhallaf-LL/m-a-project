import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Form Field",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  render: () => (
    <div className="field" style={{ maxWidth: 360, fontFamily: "var(--font-sans)" }}>
      <label className="field__label field__label--required" htmlFor="story-name">
        Name
      </label>
      <input className="field__input" id="story-name" name="name" defaultValue="Amara Okafor" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="field" style={{ maxWidth: 360, fontFamily: "var(--font-sans)" }}>
      <label className="field__label field__label--required" htmlFor="story-email">
        Email
      </label>
      <input
        className="field__input"
        id="story-email"
        name="email"
        aria-invalid="true"
        aria-describedby="story-email-error"
        defaultValue="amara.okafor@pulseboard"
      />
      <p className="field__error" id="story-email-error" role="alert" data-testid="form-error">
        Enter a valid email address.
      </p>
    </div>
  ),
};

export const Select: Story = {
  render: () => (
    <div className="field" style={{ maxWidth: 360, fontFamily: "var(--font-sans)" }}>
      <label className="field__label" htmlFor="story-role">
        Role
      </label>
      <select className="field__select" id="story-role" name="role" defaultValue="Viewer">
        <option>Admin</option>
        <option>Manager</option>
        <option>Viewer</option>
      </select>
    </div>
  ),
};

export const FullForm: Story = {
  name: "Full form (New/Edit user)",
  render: () => (
    <form style={{ maxWidth: 420, fontFamily: "var(--font-sans)", display: "grid", gap: "1.25rem" }}>
      <div className="field">
        <label className="field__label field__label--required" htmlFor="f-name">Name</label>
        <input className="field__input" id="f-name" name="name" defaultValue="Amara Okafor" />
      </div>
      <div className="field">
        <label className="field__label field__label--required" htmlFor="f-email">Email</label>
        <input className="field__input" id="f-email" name="email" aria-invalid="true" defaultValue="amara.okafor@pulseboard" />
        <p className="field__error" role="alert">Enter a valid email address.</p>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="f-role">Role</label>
        <select className="field__select" id="f-role" name="role" defaultValue="Viewer">
          <option>Admin</option>
          <option>Manager</option>
          <option>Viewer</option>
        </select>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="f-team">Team</label>
        <input className="field__input" id="f-team" name="team" defaultValue="Finance" />
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn--secondary">Cancel</button>
        <button type="submit" className="btn btn--primary">Save changes</button>
      </div>
    </form>
  ),
};
