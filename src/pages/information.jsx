import React from 'react';

import { Title, Table } from '../components/UI';
import informationText from '../assets/information';

const Information = () => (
  <div id="information">
    <Title align="center">Présentation</Title>
    <div className="information-section">{informationText.presentation}</div>

    <Title align="center">Billetterie</Title>
    <div className="information-section">{informationText.tickets}</div>

    <Title align="center">Infos joueurs</Title>
    <div className="information-section">{informationText.playersInfo}</div>

    <Title align="center">Horaires</Title>
    <div className="information-section">
      <Table
        columns={informationText.timetable.columns}
        dataSource={informationText.timetable.rows}
        className="timetable"
      />
    </div>

    <Title align="center">Services</Title>
    <div className="information-section">{informationText.services}</div>

    <Title align="center">Accès</Title>
    <div className="information-section">{informationText.access}</div>
  </div>
);

export default Information;
