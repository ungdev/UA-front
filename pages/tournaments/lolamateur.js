import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const Lolamateur = () => (
  <Tournament
    bgImg="https://cdn.mgig.fr/2019/05/mg-2c26d6dc-25f3-4b20-966c-w1000h563-sc.jpg"
    text={text.lolamateur}
    reglement="https://backoffice.gamers-assembly.net/sites/default/files/tournament/OES-2019%20-%20R%C3%A8glement%20-%20League%20of%20Legends.pdf"
    dataSource={[]}
  />
);

export default Lolamateur;
