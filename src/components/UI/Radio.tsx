import { ReactNode } from 'react';

/**
 * Radio component that allows the user to select one option from a list of options.
 */
const Radio = ({
  label = '',
  options,
  name,
  value = '',
  onChange = () => {},
  row = false,
  className = '',
  disabled = false,
}: {
  /** Label of the field */
  label?: ReactNode;
  /** Available values */
  options: {
    name: ReactNode;
    value: string;
  }[];
  /** Value of the field */
  value?: string;
  /** Function triggered when the value change */
  onChange?: (value: string) => void;
  /** Used to identify the group of radio inputs */
  name: string;
  /** Should the inputs be in a row ? */
  row?: boolean;
  /** An optional class name to add to the container */
  className?: string;
  /** Whether the input should be disabled */
  disabled?: boolean;
}) => (
  <div className={`radio ${row ? 'row' : ''} ${className}`}>
    <div className="radio-label">{label}</div>

    <div className="radio-container">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange!(e.target.value)}
            disabled={disabled}
          />

          <div className="radio-value">
            <i className="far fa-circle" />
          </div>

          {option.name}
        </label>
      ))}
    </div>
  </div>
);

export default Radio;
