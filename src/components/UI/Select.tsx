/**
 * Displays a select
 * @param label Label to display
 * @param options List of options
 * @param value Value of the select
 * @param onChange Function called when the value change, the new value is passed as parameter
 * @param disabled Is the field disabled ?
 * @param className Class of the container
 */
const Select = ({
  label,
  options,
  value,
  onChange,
  disabled,
  className,
}: {
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  className: string;
}) => (
  <div className={`select ${className}`}>
    <label>
      <div className="select-label">{label}</div>

      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="line" />
    </label>
  </div>
);

export default Select;
