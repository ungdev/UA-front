import styles from './Inputs.module.scss';

/**
 * Displays a select field.
 */
const Select = ({
  label = '',
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}: {
  /** Label to display */
  label?: string;
  /** List of options */
  options: {
    label: string;
    value: string;
  }[];
  /** Value of the select */
  value: string;
  /** Function called when the value change, the new value is passed as parameter */
  onChange: (value: string) => void;
  /** Is the field disabled ? */
  disabled?: boolean;
  /** An optional class name to add to the container */
  className?: string;
}) => (
  <div className={`${styles.select} ${className}`}>
    <label>
      <div className={styles.selectLabel}>{label}</div>

      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default Select;
