import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSlots } from '../modules/tournament';
import { Card, Title } from './UI';
import tournaments from '../utils/tournaments';

const TournamentCards = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.user);
  const slotsTournaments = useSelector((state) => state.tournament.slots);

  useEffect(() => {
    if (isLoggedIn && !slotsTournaments) {
      dispatch(fetchSlots());
    }
  }, [isLoggedIn]);

  return (
    <div className="tournament-cards">
      <Title align="center">Tournois</Title>
      <Title level={3} align="center" className="uppercase">
        Les 7 tournois à l'UTT Arena 2022
      </Title>

      <div className="tournaments-list">
        {tournaments.map(({ name, shortName, players, teamCount, image, shortRewards, casters }) => (
          <Card
            dark
            content={
              <>
                <div className={'tournament-name' + `${shortName === 'csgo' ? ' smaller' : ''}`}>{name}</div>
                <div className="tournament-details">
                  <p>
                    <strong>Places :</strong> {teamCount ?? players}{' '}
                    <span className="unit">{teamCount ? 'équipes' : 'joueurs'}</span>
                  </p>
                  {shortRewards && (
                    <p>
                      <strong>Récompenses :</strong> {shortRewards}
                    </p>
                  )}
                </div>
                {casters && (
                  <div className="tournament-details">
                    <p>
                      <strong>Casters :</strong> {casters}
                    </p>
                  </div>
                )}
              </>
            }
            imgSrc={image}
            href={`/tournaments/${shortName}`}
            buttonContent={
              <>
                Plus d'infos <i className="fas fa-chevron-right right-arrow" />
              </>
            }
            className="tournament-card"
            key={shortName}
            alt={`Tournoi ${name}`}
            divider="belowImage"
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentCards;
