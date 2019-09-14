import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const Ssbu = () => (
  <Tournament
    bgImg="/static/ssbu.webp"
    text={text.ssbu}
    reglement="https://backoffice.gamers-assembly.net/sites/default/files/tournament/OES-2019%20-%20R%C3%A8glement%20-%20League%20of%20Legends.pdf"
    dataSource={[]}
  />
);

export default Ssbu;