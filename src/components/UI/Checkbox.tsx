import { ReactNode } from 'react';

/**
 * Checkbox component that displays a label and a checkbox input.
 */
const Checkbox = ({
  label = '',
  value = false,
  onChange = () => {},
  className = '',
  autoFocus = false,
}: {
  /** The label to display next to the checkbox. */
  label?: ReactNode;
  /** The value of the checkbox. */
  value?: boolean;
  /** The function to call when the checkbox value changes. */
  onChange?: (value: boolean) => void;
  /** The CSS class name to apply to the checkbox container. */
  className?: string;
  /** Whether the checkbox should be focused on mount. */
  autoFocus?: boolean;
}) => {
  return (
    <label className={`checkbox ${className}`}>
      <input
        type="checkbox"
        checked={value}
        value={value.toString()}
        onChange={() => {
          onChange(!value);
        }}
        autoFocus={autoFocus}
      />
      <div className="ui"></div>

      <div className="checkbox-label">{label}</div>
    </label>
  );
};

export default Checkbox;
