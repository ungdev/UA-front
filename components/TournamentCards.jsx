import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSlots } from '../modules/tournament';
import { Card, Title } from './UI';
import tournamentCardsText from '../assets/tournamentCards';

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

  return (
    <div className="tournament-cards">
      <Title align="center" uppercase>Tournois</Title>
      <Title level={4} align="center" uppercase>{tournamentCardsText.catchPhrase}</Title>

      <div className="tournaments-list">
        { tournamentCardsText.list.map(({ title, rewards, players, img, link, id }) => (
          <Card
            dark
            content={(
              <>
                <div className="tournament-title">{title}</div>
                <p><strong>Places :</strong> {players} joueurs</p>
                {rewards && <p><strong>Récompenses :</strong> {rewards}</p>}
                {slotsTournaments && <p>
                  <strong> Places disponibles :</strong> {slotsTournaments[id].available} / {slotsTournaments[id].total}
                </p>}
              </>
            )}
            imgSrc={img}
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