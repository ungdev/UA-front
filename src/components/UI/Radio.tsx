import { ReactNode } from 'react';

/**
 * Radio component that allows the user to select one option from a list of options.
 * @param label Label of the field
 * @param options Available values
 * @param value Value of the field
 * @param onChange Function triggered when the value change
 * @param name Used to identify a group of radio inputs
 * @param row Should the inputs be in a row ?
 * @param className Class to apply to the container
 * @param disabled Whether the input should be disabled
 */
const Radio = ({
  label,
  options,
  name,
  value,
  onChange,
  row,
  className,
  disabled,
}: {
  label?: ReactNode;
  options: {
    name: ReactNode;
    value: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  row?: boolean;
  className?: string;
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

Radio.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  row: false,
  className: '',
  disabled: false,
};

export default Radio;
