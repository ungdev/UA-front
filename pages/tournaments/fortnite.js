import React from 'react';
import { Tournament } from '../../components';
import text from '../../assets/text';

const fortnite = () => (
  <Tournament
    bgImg="https://cdn2.unrealengine.com/Fortnite%2Fbattle-royale%2F09BP_Web_GetFornitePage_3UPMain-1920x1000-f8c6eabdf58b43b779e5762693908748572e6cb0.jpg"
    text={text.fortnite}
    reglement="https://backoffice.gamers-assembly.net/sites/default/files/tournament/OES-2019%20-%20R%C3%A8glement%20-%20League%20of%20Legends.pdf"
    dataSource={[]}
  />
);

export default fortnite;