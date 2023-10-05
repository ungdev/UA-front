import styles from './Title.module.scss';
import Divider from '@/components/UI/Divider';
import TextStroke from '@/components/UI/TextStroke';

/**
 * Renders a title component with the specified level, children, gutterBottom, align, className, and id.
 */
const Title = ({
  level = 1,
  type = 1,
  children,
  gutterBottom = true,
  align = 'inherit',
  className = '',
  id = undefined,
}: {
  /** The level of the title component (1-6) from h1 to h6. */
  level?: number;
  /** The type of the title component (1-6). */
  type?: number;
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
    <Component
      id={id}
      className={`${styles.title} ${styles[`title-${type}`]} ${className} ${styles[align]} ${
        gutterBottom ? styles.gutterBottom : ''
      }`}>
      {type === 2 ? (
        <div className={styles.textDivider}>
          <Divider />
          <div className={`${styles.titleContent} ${styles[align]} ${gutterBottom ? styles.gutterBottom : ''}`}>
            {children}
          </div>
          <Divider />
        </div>
      ) : type === 1 ? (
        <TextStroke className={`${styles.titleContent} ${styles[align]}`} width={12}>
          {children}
        </TextStroke>
      ) : (
        <div className={`${styles.titleContent} ${styles[align]}`}>{children}</div>
      )}
    </Component>
  );
};

export default Title;
