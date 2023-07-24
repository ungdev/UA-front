import React, { useState, useEffect } from 'react';

export default function Counter({ value, name, className = "" }: { value: number, name: string, className?: string }) {
    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(false);
    const [locked, setLocked] = useState(false);

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
        }
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

    return (
        <div className={"counter " + className}>
            <div className="counter-value">{ counter.toLocaleString() }</div>
            <div className="counter-label">{ name }</div>
        </div>
    );
};