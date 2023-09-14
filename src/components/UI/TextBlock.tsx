import styles from './TextBlock.module.scss';
import { Title } from '.';
import DoubleImage from '@/components/UI/DoubleImage';

/**
 * Renders a component that displays a title and some text on the left and two images on the right.
 */
const TextBlock = ({
  title,
  children,
  images,
  left = false,
}: {
  /** The title to display. */
  title: string;
  /** The text to display. */
  children: React.ReactNode;
  /** The images to display. */
  images: string[];
  /** Whether the text should be on the left or right. */
  left?: boolean;
}) => (
  <div className={styles.informationContainer}>
    <div className={`${styles.left} ${left ? styles.first : ''}`}>
      <Title level={3} type={1}>
        {title}
      </Title>
      <p className={styles.informationText}>{children}</p>
    </div>
    <DoubleImage className={styles.right} image1={images[0]} image2={images[1]} />
  </div>
);

export default TextBlock;
