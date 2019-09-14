import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const SSBU = () => (
  <Tournament
    imgSrc="/static/ssbu.webp"
    text={text.ssbu}
  />
);

export default SSBU;