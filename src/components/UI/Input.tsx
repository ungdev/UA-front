import { ReactNode } from 'react';

/**
 * A reusable input component that can be used to render different types of input fields.
 */
const Input = ({
  type = 'text',
  label = '',
  placeholder = '',
  value = '',
  onChange = () => {},
  min = undefined,
  max = undefined,
  className = '',
  autocomplete = '',
  disabled = false,
  autoFocus = false,
}: {
  /** The type of input to render. */
  type?: 'text' | 'email' | 'password' | 'number';
  /** The label to display. */
  label?: ReactNode;
  /** The placeholder to display. */
  placeholder?: string;
  /** The value of the input. */
  value?: string | number;
  /** The function to call when the value changes. */
  onChange?: (value: string) => void;
  /** The minimum value (only for type="number"). */
  min?: number | undefined;
  /** The maximum value (only for type="number"). */
  max?: number | undefined;
  /** An optional class name to add to the component. */
  className?: string;
  /** The autocomplete type. */
  autocomplete?: string;
  /** Is the input disabled ? */
  disabled?: boolean;
  /** Should the input have the focus by default ? */
  autoFocus?: boolean;
}) => {
  const handleChange = (newValue: string) => {
    if (
      type === 'number' &&
      newValue !== '' &&
      min != undefined &&
      max != undefined &&
      (parseInt(newValue) < min || parseInt(newValue) > max)
    ) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={`input ${className}`}>
      <label>
        <div className="input-label">{label}</div>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete={autocomplete}
          disabled={disabled}
          title={disabled ? 'Tu ne peux pas modifier ce champ' : undefined}
          autoFocus={autoFocus}
        />
      </label>
    </div>
  );
};

export default Input;
