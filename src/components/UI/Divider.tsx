/**
 * A component that renders a divider with an optional white color.
 */
const Divider = ({
  white = false,
}: {
  /** A boolean indicating whether the divider should be white or not. */
  white?: boolean;
}) => {
  return <div className={`divider ${white ? 'white' : ''}`}></div>;
};

export default Divider;
