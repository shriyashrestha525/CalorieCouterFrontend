import "../../style/custom_form_field_styles.css";

export default function CustomFormField({ label, placeholder, type, value, name, onChange }) {
  return (
    <div id="form-field">
      <p>
        <label id="label" htmlFor={name}>{label}</label>
      </p>
      <input
        id="field"
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}
