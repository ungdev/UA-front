'use client';

/** This component is used to pass parameters for each element to the Parallax component */
export default function ParallaxElementSettings({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  speed,
  children,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  className,
}: {
  /* speed is the speed of the element compared to the scroll speed */
  speed: number;
  /* children is the element to display */
  children: React.ReactNode;
  /* className is the class of the element */
  className: string;
}) {
  return children;
}
