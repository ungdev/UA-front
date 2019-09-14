import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const LoLamateur = () => (
  <Tournament
    imgSrc="/static/lolamateur.webp"
    text={text.lolamateur}
  />
);

export default LoLamateur;
