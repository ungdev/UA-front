import React from 'react';

import { Tournament } from '../../components';
import tournamentsAssets from '../../assets/tournaments';

const Libre = () => <Tournament assets={tournamentsAssets.libre} tournamentId="7" isSolo />;

export default Libre;
