'use client';
import { useState, useEffect } from 'react';

/**
 * Counter component that animates a number from 0 to a given value when it becomes visible on the screen.
 * @param value The value to animate the counter to.
 * @param name The label to display below the counter.
 * @param className An optional class name to apply to the component.
 */
function Counter({
  value,
  valueText = '',
  name,
  className = '',
}: {
  value: number;
  valueText?: string;
  name: string;
  className?: string;
}) {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);

  /**
   * Animates the counter from a start value to an end value over a given duration.
   * @param start The starting value of the counter.
   * @param end The ending value of the counter.
   * @param duration The duration of the animation in milliseconds.
   */
  const counterAnim = (start = 0, end: number, duration = 1000) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCounter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      setVisible(entry.isIntersecting);
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    },
  );

  useEffect(() => {
    observer.observe(document.querySelector('.counter')!);
  }, []);

  useEffect(() => {
    if (visible && !locked) {
      counterAnim(0, value, 1000);
      setLocked(true);
    }
  }, [visible]);

  const stringifyCounterValue = () => {
    if (window.innerWidth > 1024) {
      return counter.toLocaleString();
    }
    if (counter > 10_000) {
      return Math.floor(counter / 1000).toLocaleString() + 'k';
    }
    if (counter > 1_000) {
      const hundreds = Math.floor((counter % 1000) / 100);
      return Math.floor(counter / 1000).toLocaleString() + 'k' + (hundreds !== 0 ? Math.floor(hundreds).toLocaleString() : '');
    }
    return counter.toLocaleString();
  };

  return (
    <div className={'counter ' + className}>
      <div className="counter-value">{stringifyCounterValue() + valueText}</div>
      <div className="counter-label">{name}</div>
    </div>
  );
}

export default Counter;
