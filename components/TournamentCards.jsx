import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSlots } from '../modules/tournament';
import { Card, Title } from './UI';
import tournamentCardsAssets from '../assets/tournamentCards';

import './TournamentCards.css';

const TournamentCards = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.user);
  const slotsTournaments = useSelector((state) => state.tournament.slots);

  useEffect(() => {
    if (isLoggedIn && !slotsTournaments) {
      dispatch(fetchSlots());
    }
  }, [isLoggedIn]);

  // todo: enlever ça
  const maxSlots = {
    1: 16,
    2: 16,
    3: 24,
    4: 16,
    5: 64,
    6: 24,
    7: 24,
  };

  return (
    <div className="tournament-cards">
      <Title align="center" uppercase>Tournois</Title>
      <Title level={4} align="center" uppercase>{tournamentCardsAssets.catchPhrase}</Title>

      <div className="tournaments-list">
        { tournamentCardsAssets.list.map(({ title, rewards, players, image, link, id }) => (
          <Card
            dark
            content={(
              <>
                <div className="tournament-title">{title} {slotsTournaments && slotsTournaments[id].available <= 0 && '(COMPLET)'}</div>
                <p><strong>Places :</strong> {players} joueurs</p>
                {rewards && <p><strong>Récompenses :</strong> {rewards}</p>}
                {slotsTournaments && <p>
                  <strong> Places disponibles :</strong> { Math.max(slotsTournaments[id].available, 0)} / { maxSlots[id] }
                </p>}
              </>
            )}
            imgSrc={image}
            href={link}
            buttonContent={<>Plus d'infos <i className="fas fa-chevron-right right-arrow" /></>}
            className="tournament-card"
            key={title}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentCards;