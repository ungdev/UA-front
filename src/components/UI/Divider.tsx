/**
 * A component that renders a divider with an optional white color.
 * @param is_white - A boolean indicating whether the divider should be white or not.
 * @returns A React component.
 */
const Divider = ({ is_white = false }: { is_white?: boolean }) => {
  return <div className={`divider ${is_white ? 'white' : ''}`}></div>;
};

export default Divider;
