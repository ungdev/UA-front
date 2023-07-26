/**
 * Checkbox component that displays a label and a checkbox input.
 * @param {string} label - The label to display next to the checkbox.
 * @param {boolean} value - The value of the checkbox.
 * @param {function} onChange - The function to call when the checkbox value changes.
 * @param {string} className - The CSS class name to apply to the checkbox container.
 * @param {boolean} autoFocus - Whether the checkbox should be focused on mount.
 * @returns {JSX.Element} - The rendered Checkbox component.
 */
const Checkbox = ({
  label,
  value,
  onChange,
  className,
  autoFocus,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
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

Checkbox.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  className: '',
  autoFocus: false,
};

export default Checkbox;
