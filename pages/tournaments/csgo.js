import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const CSGO = () => (
  <Tournament
    imgSrc="/static/csgo.webp"
    text={text.csgo}
  />
);

export default CSGO;