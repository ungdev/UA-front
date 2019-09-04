import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const Ssbu = () => (
  <Tournament
    bgImg="https://img.bfmtv.com/c/1256/708/88a/c71b34349143f15d3bc2ed1e4745e.jpeg"
    text={text.ssbu}
    reglement="https://backoffice.gamers-assembly.net/sites/default/files/tournament/OES-2019%20-%20R%C3%A8glement%20-%20League%20of%20Legends.pdf"
    dataSource={[]}
  />
);

export default Ssbu;