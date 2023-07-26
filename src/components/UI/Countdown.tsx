import Countdown from 'react-countdown';

/**
 * A component that displays a countdown to a specific date.
 * @param date The date to count down to.
 * @param className The CSS class name to apply to the component.
 */
const CountdownComponent = ({ date, className = '' }: { date: Date; className?: string }) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
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

  return <Countdown date={date} renderer={renderer} />;
};

export default CountdownComponent;
