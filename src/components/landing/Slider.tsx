import React, { useState, useEffect } from 'react';

/**
 * Slider component for displaying a slideshow of React nodes.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode[]} props.slides - An array of React nodes to be displayed as slides.
 * @example
 * const slides = [<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>];
 * return <Slider slides={slides} />;
 */
export default function Slider({ slides }: { slides: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const max = slides.length;

  // Constant
  const TIME_BETWEEN_SLIDES = 10000;

  const intervalBetweenSlides = () => setActive(active === max - 1 ? 0 : active + 1);

  useEffect(() => {
    const interval = setInterval(() => intervalBetweenSlides(), TIME_BETWEEN_SLIDES);
    return () => clearInterval(interval);
  });

  const nextOne = () => (active < max - 1 ? setActive(active + 1) : setActive(0));

  const prevOne = () => (active > 0 ? setActive(active - 1) : setActive(max - 1));

  const isActive = (value: number) => active === value && 'active';

  const setSliderStyles = () => {
    const transition = active * -100;

    return {
      width: slides.length * 100 + 'vw',
      transform: 'translateX(' + transition + 'vw)',
    };
  };

  const renderSlides = () =>
    slides.map((item, index) => (
      <div className="each-slide" key={index}>
        {item}
      </div>
    ));

  const renderDots = () =>
    slides.map(
      (
        silde,
        index, // check index
      ) => (
        <li className={isActive(index) + ' dots'} key={index}>
          <div onClick={() => setActive(index)}>
            <span></span>
          </div>
        </li>
      ),
    );

  const renderArrows = () => (
    <>
      <div className="arrows prev" onClick={() => prevOne()}>
        <svg fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <div className="arrows next" onClick={() => nextOne()}>
        <svg fill="#FFFFFF" height="50" viewBox="0 0 24 24" width="50">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    </>
  );

  return (
    <section className="slider">
      <div className="wrapper" style={setSliderStyles()}>
        {renderSlides()}
      </div>
      {renderArrows()}
      <ul className="dots-container">{renderDots()}</ul>
    </section>
  );
}
