import styles from './Inputs.module.scss';

/**
 * Displays a textarea
 * @param label Label to display
 * @param placeholder Text to show when field is blank
 * @param value Value of the input
 * @param onChange Function called when the value change, the new value is passed as parameter
 * @param className Class of the container
 */
const Textarea = ({
  label,
  placeholder = '',
  value = '',
  onChange,
  className = '',
  disabled = false,
}: {
  /** Label to display */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Value of the input */
  value?: string;
  /** Function called when the value change, the new value is passed as parameter */
  onChange: (value: string) => void;
  /** An optional class name to apply to the container element */
  className?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
}) => (
  <div className={`${styles.textarea} ${className}`}>
    <label>
      <div className={styles.textareaLabel}>{label}</div>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </label>
  </div>
);

export default Textarea;
