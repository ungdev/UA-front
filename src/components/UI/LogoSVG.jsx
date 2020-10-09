import React from 'react';

const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 739.888 649.251">
    <filter id="blur">
      <feGaussianBlur stdDeviation="2" />
    </filter>
    <filter id="shadow">
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="7" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
    <g transform="translate(-876.005 -297.79)">
      <g className="externe">
        <path
          id="externe"
          className="neon"
          data-name="externe"
          d="M583.953,252.336l30.085-17.063L653,279.376l66.369,75.12-83.206,47.031c.109,3.114.164,6.216.164,9.289A265.529,265.529,0,0,1,616.91,510.944M256.621,170.423a266.047,266.047,0,0,1,247.708,10.549M182.5,657.946l-39.4,22.268-15.068-45.46L93.485,530.518l31.382-17.8q-5-12-8.776-24.356a266.649,266.649,0,0,1,43.484-239.475M558.464,598.8A265.6,265.6,0,0,1,248.6,647.158"
          transform="translate(839.52 209.827)"
          fill="none"
          stroke="#06b8ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="14"
          filter="url(#shadow)"
        />
        <path
          id="externe_light"
          className="light"
          data-name="externe_light"
          d="M583.953,252.336l30.085-17.063L653,279.376l66.369,75.12-83.206,47.031c.109,3.114.164,6.216.164,9.289A265.529,265.529,0,0,1,616.91,510.944M256.621,170.423a266.047,266.047,0,0,1,247.708,10.549M182.5,657.946l-39.4,22.268-15.068-45.46L93.485,530.518l31.382-17.8q-5-12-8.776-24.356a266.649,266.649,0,0,1,43.484-239.475M558.464,598.8A265.6,265.6,0,0,1,248.6,647.158"
          transform="translate(839.52 209.827)"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          filter="url(#blur)"
        />
      </g>
      <g className="inside">
        <path
          id="inside"
          className="neon"
          data-name="inside"
          d="M680.867,351.542l-77.4-87.607-30.732,17.43A238.98,238.98,0,0,0,371.59,171.638c-132.093,0-239.177,107.084-239.177,239.178a238.166,238.166,0,0,0,24.833,106.2l-31.854,18.067L161.8,644.928l70.363-39.771A238.076,238.076,0,0,0,371.59,649.993c132.094,0,239.178-107.084,239.178-239.177q0-9.705-.77-19.217ZM363.628,565.572A182.126,182.126,0,1,1,545.754,383.447,182.126,182.126,0,0,1,363.628,565.572Z"
          transform="translate(839.52 209.827)"
          fill="none"
          stroke="#ed00e4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="15"
          filter="url(#shadow)"
        />
        <path
          id="inside_light"
          className="light"
          data-name="inside_light"
          d="M680.867,351.542l-77.4-87.607-30.732,17.43A238.98,238.98,0,0,0,371.59,171.638c-132.093,0-239.177,107.084-239.177,239.178a238.166,238.166,0,0,0,24.833,106.2l-31.854,18.067L161.8,644.928l70.363-39.771A238.076,238.076,0,0,0,371.59,649.993c132.094,0,239.178-107.084,239.178-239.177q0-9.705-.77-19.217ZM363.628,565.572A182.126,182.126,0,1,1,545.754,383.447,182.126,182.126,0,0,1,363.628,565.572Z"
          transform="translate(839.52 209.827)"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          filter="url(#blur)"
        />
      </g>
    </g>
  </svg>
);

export default LogoSVG;
