'use client';
import React from 'react';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';

/**
 * Displays a countdown to the specified date
 */
const CountdownComponent = ({
  date,
  className,
}: {
  /**
   * The date from which the remaining time will be computed
   */
  date: Date;
  /**
   * Class of the container
   */
  className: string;
}) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    }

    return (
      <div className={`countdown ${className}`}>
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
      </div>
    );
  };

  renderer.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  };

  return <Countdown date={date} renderer={renderer} />;
};

CountdownComponent.defaultProps = {
  className: '',
};

export default CountdownComponent;
