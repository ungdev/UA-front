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
  <div className="information-container">
    <div className={'left ' + (left ? 'first' : '')}>
      <Title level={1}>{title}</Title>
      <p className="information-text">{children}</p>
    </div>
    <DoubleImage className="right" image1={images[0]} image2={images[1]} />
  </div>
);

export default TextBlock;
