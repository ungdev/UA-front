import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import Title from './UI/Title';
import Table from './UI/Table';
import Button from './UI/Button';
import './Tournament.css';

const Tournament = ({ bgImg, logo, text, reglement, dataSource }) => (
  <div className="tournament">
    <div className="tournament-header" style={{ backgroundImage: `url("${bgImg}")` }}>
      <img src={logo} alt="logo" className="tournament-logo" />
    </div>
    <div className="tournament-content">
      <Title align="center">{text.title}</Title>
      <div className="tournament-signin">
        <Button primary>S&apos;inscrire</Button>
      </div>
      <Title level={2}>Format</Title>
      <p>{parse(text.format)}</p>
      <Title level={2}>Cashprize</Title>
      <p>{text.cashprize}</p>
      <Title level={2}>Réglement</Title>
      <div className="tournament-rules">
        <p>
          Chaque retard pourra être sanctionné à hauteur d’une perte de manche par
          tranche de 20 minutes de retard. Cet effet peut se répéter
        </p>
        <a href={reglement} target="blank">Réglement complet</a>
      </div>
      <Title level={2}>Equipes inscrites</Title>
      <Table
        columns={[
          { title: 'Equipe', key: 'team' },
          { title: 'Joueurs', key: 'players' },
        ]}
        dataSource={dataSource}
      />
    </div>
  </div>
);

Tournament.propTypes = {
  bgImg: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  reglement: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default Tournament;
