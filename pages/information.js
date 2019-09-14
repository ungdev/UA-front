import React from 'react';
import { Title, Table, Header } from '../components';

import informationText from '../assets/information';
import './information.css';

const Information = () => (
  <>
    <Header />

    <div id="information" className="page-padding">
      <Title align="center" uppercase>Présentation</Title>
      <div className="information-section">{informationText.presentation}</div>

      <Title align="center" uppercase>Billetterie</Title>
      <div className="information-section">{informationText.tickets}</div>

      <Title align="center" uppercase>Infos joueurs</Title>
      <div className="information-section">{informationText.playersInfo}</div>

      <Title align="center" uppercase>Services</Title>
      <div className="information-section">{informationText.services}</div>

      <Title align="center" uppercase>Accès</Title>
      <div className="information-section">{informationText.access}</div>

      <Title align="center" uppercase>Horaires</Title>
      <div className="information-section">
        <Table
          columns={informationText.timetable.columns}
          dataSource={informationText.timetable.rows}
        />
      </div>
    </div>
  </>
);

export default Information;
