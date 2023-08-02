import { Title } from '.';
import BoxContainer from '../landing/BoxContainer';

const TextBlock = ({
  title,
  children,
  images,
  left,
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
    <div className="right">
      <BoxContainer title="image.jpg" padding={false}>
        <img src={images[0]} alt="Information Image" className="" />
      </BoxContainer>
      <BoxContainer title="image.jpg" padding={false}>
        <img src={images[1]} alt="Information Image" className="" />
      </BoxContainer>
    </div>
  </div>
);

export default TextBlock;
