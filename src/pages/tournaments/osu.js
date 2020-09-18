import React from 'react';

import { Tournament } from '../../components';
import tournamentsAssets from '../../assets/tournaments';

const osu = () => <Tournament assets={tournamentsAssets.osu} tournamentId="6" isSolo />;

export default osu;
