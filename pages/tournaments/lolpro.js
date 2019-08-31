import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text.json';

const Lolpro = () => (
  <Tournament
    bgImg="https://exp.gg/wp-content/uploads/2018/10/fnatic-pickem-768x432.jpg"
    logo="https://www.lyon-esport.fr/media/logos/games/league-of-legends.png"
    text={text.lolpro}
    reglement="https://backoffice.gamers-assembly.net/sites/default/files/tournament/OES-2019%20-%20R%C3%A8glement%20-%20League%20of%20Legends.pdf"
    dataSource={[]}
  />
);

export default Lolpro;
