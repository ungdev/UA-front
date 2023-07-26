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
  placeholder,
  value,
  onChange,
  className,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}) => (
  <div className={`textarea ${className}`}>
    <label>
      <div className="textarea-label">{label}</div>

      <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />

      <div className="line" />
    </label>
  </div>
);

export default Textarea;
