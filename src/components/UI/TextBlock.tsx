import { Title } from '.';
import DoubleImage from '@/components/UI/DoubleImage';

const TextBlock = ({
  title,
  children,
  images,
  left = false,
}: {
  title: string;
  children: React.ReactNode;
  images: string[];
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
