import React from 'react';

import { Title, Table } from '../components/UI';
import informationText from '../assets/information';

import './information.css';

const Information = () => (
  <div id="information">
    <Title align="center" uppercase>Présentation</Title>
    <div className="information-section">{informationText.presentation}</div>

    <Title align="center" uppercase>Billetterie</Title>
    <div className="information-section">{informationText.tickets}</div>

    <Title align="center" uppercase>Infos joueurs</Title>
    <div className="information-section">{informationText.playersInfo}</div>

    <Title align="center" uppercase>Horaires</Title>
    <div className="information-section">
      <Table
        columns={informationText.timetable.columns}
        dataSource={informationText.timetable.rows}
        className="timetable"
      />
    </div>

    <Title align="center" uppercase>Services</Title>
    <div className="information-section">{informationText.services}</div>

    <Title align="center" uppercase>Accès</Title>
    <div className="information-section">{informationText.access}</div>
  </div>
);

export default Information;
