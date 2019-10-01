import React from 'react';
import Countdown from 'react-countdown-now';
import PropTypes from 'prop-types';

import './Countdown.css';

/**
 * Displays a countdown to the specified date
 */
const CountdownComponent = ({ date, className }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    }

    return (
      <React.Fragment key={date.toISOString()}>
        <div className="days">
          <h1>{days}</h1>
          <h2>Jours</h2>
        </div>
        <div className="hours">
          <h1>{hours}</h1>
          <h2>Heures</h2>
        </div>
        <div className="minutes">
          <h1>{minutes}</h1>
          <h2>Minutes</h2>
        </div>
        <div className="seconds">
          <h1>{seconds}</h1>
          <h2>Secondes</h2>
        </div>
      </React.Fragment>
    );
  };

  renderer.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  };

  return (
    <div className={`countdown ${className}`}>
      <Countdown date={date} renderer={renderer} />
    </div>
  );
};

CountdownComponent.propTypes = {
  /**
   * The date from which the remaining time will be computed
   */
  date: PropTypes.object.isRequired,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

CountdownComponent.defaultProps = {
  className: '',
};

export default CountdownComponent;