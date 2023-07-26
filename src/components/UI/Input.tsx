import { ReactNode } from 'react';

/**
 * A reusable input component that can be used to render different types of input fields.
 * @param type - Input type
 * @param label - Label to display
 * @param placeholder - Text to display if field is blank
 * @param value - Value of the input
 * @param onChange - Function called when the value change, the new value is passed as parameter
 * @param min - Minimum value (only for type="number")
 * @param max - Maximum value (only for type="number")
 * @param className - Class of the container
 * @param autocomplete - Autocomplete type
 * @param disabled - Is the input disabled ?
 * @param autoFocus - Should the input have the focus by default ?
 * @returns A React component that renders an input field with a label and optional min/max values.
 */
const Input = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  min,
  max,
  className,
  autocomplete,
  disabled,
  autoFocus,
}: {
  type: 'text' | 'email' | 'password' | 'number';
  label: ReactNode;
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
  min: number;
  max: number;
  className: string;
  autocomplete: string;
  disabled: boolean;
  autoFocus: boolean;
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

        <div className="line" />
      </label>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  value: '',
  onChange: () => {},
  min: undefined,
  max: undefined,
  className: '',
  autocomplete: '',
  disabled: false,
  autoFocus: false,
};

export default Input;
