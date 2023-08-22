import Divider from './Divider';

/**
 * Renders a title component with the specified level, children, gutterBottom, align, className, and id.
 */
const Title = ({
  level = 1,
  children,
  gutterBottom = true,
  align = 'inherit',
  className = '',
  id = undefined,
}: {
  /** The level of the title component (1-4). */
  level?: number;
  /** The content to be displayed inside the title component. */
  children: React.ReactNode;
  /** Whether to add a bottom margin to the title component. */
  gutterBottom?: boolean;
  /** The horizontal alignment of the title component. */
  align?: 'inherit' | 'center' | 'justify' | 'left' | 'right';
  /** An optional class name to apply to the title component. */
  className?: string;
  /** The HTML id attribute to be added to the title component. */
  id?: string;
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component id={id} className={`title title-${level} ${className} ${align} ${gutterBottom ? 'gutterBottom' : ''}`}>
      {level === 2 ? (
        <div className="text-divider">
          <Divider />
          <div className={`title-content ${className} ${align} ${gutterBottom ? 'gutterBottom' : ''}`}>{children}</div>
          <Divider />
        </div>
      ) : (
        <div className="title-content">{children}</div>
      )}
    </Component>
  );
};

export default Title;
