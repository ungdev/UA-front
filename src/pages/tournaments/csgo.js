import React from 'react';

import Tournament from '../../components/Tournament';
import tournamentsAssets from '../../assets/tournaments';

const CSGO = () => <Tournament assets={tournamentsAssets.csgo} tournamentId="4" />;

export default CSGO;
