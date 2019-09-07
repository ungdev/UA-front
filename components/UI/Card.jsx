import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from './Button';
import './Card.css';

const Card = ({ imgSrc, content, textButton, onClick, link }) => {
  const button = <Button primary onClick={onClick}>{textButton}</Button>;
  return (
    <div className="card-card">
      {!!imgSrc && <img className="lazyload card-img" alt="card-img" src={imgSrc} />}
      <div className="card-content">
        {content}
      </div>
      <div className="card-button">
        {!!textButton && !!link ? <Link href={link} key={link}>{button}</Link> : button}
      </div>
    </div>
  );
};

Card.propTypes = {
  imgSrc: PropTypes.string,
  content: PropTypes.object.isRequired,
  textButton: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string,
};

Card.defaultProps = {
  imgSrc: undefined,
  textButton: undefined,
  onClick: () => {},
  link: undefined,
};

export default Card;
