
export const Input = ({ placeholder, value, onChange, disabled, type = 'text', required = false }) => {
  return (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
    />
  );
};