import React from 'react';

import Tournament from '../../components/Tournament';
import tournamentsAssets from '../../assets/tournaments';

const SSBU = () => <Tournament assets={tournamentsAssets.ssbu} tournamentId="5" isSolo />;

export default SSBU;
