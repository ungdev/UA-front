import Divider from './Divider';

/**
 * Renders a title component with the specified level, children, gutterBottom, align, className, and id.
 * @param {number} level - The level of the title component (1-4).
 * @param {React.ReactNode} children - The content to be displayed inside the title component.
 * @param {boolean} gutterBottom - Whether to add a bottom margin to the title component.
 * @param {string} align - The horizontal alignment of the title component.
 * @param {string} className - The CSS class name(s) to be added to the title component.
 * @param {string} id - The HTML id attribute to be added to the title component.
 * @returns {JSX.Element} - The rendered title component.
 */
const Title = ({
  level = 1,
  children,
  gutterBottom = true,
  align = 'inherit',
  className = '',
  id = undefined,
}: {
  level?: number;
  children: React.ReactNode;
  gutterBottom?: boolean;
  align?: 'inherit' | 'center' | 'justify' | 'left' | 'right';
  className?: string;
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
