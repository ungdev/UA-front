import React, { useEffect, useState } from 'react';

import { Title, Loader } from '../components/UI';
import { Organisers as OrganisersType } from '../types';
import { uploads } from '../utils/api';
import { uploadsUrl } from '../utils/environment';
import { getOrganiserShortName } from '../utils/strings';

const Organisers = () => {
  const [organisers, setOrganisers] = useState<OrganisersType | null>(null);

  useEffect(() => {
    fetchOrganisers();
  }, []);

  const fetchOrganisers = async () => {
    const request = await uploads.get<OrganisersType>('/organisers/list.json', true);

    setOrganisers(request.data);
  };

  return (
    <div id="organisers">
      <Title align="center" className="uppercase">
        Organisateurs
      </Title>

      <p>
        Merci à tous les organisateurs qui permettent à ce magnifique événement d'exister !<br />
        Ils sont tous bénévoles et étudiants à l'Université de Technologie de Troyes (UTT).
      </p>

      {!organisers ? (
        <Loader />
      ) : (
        organisers.map((commission) => (
          <div className="commission" key={commission.title}>
            <Title level={2}>{commission.title}</Title>
            <p>{commission.description}</p>

            <div className="members">
              {commission.members.map((member) => (
                <div className="member" key={member.name}>
                  <img
                    src={`${uploadsUrl()}/organisers/${getOrganiserShortName(member.name)}.jpg`}
                    onError={(e) => {
                      const imageElement = e.target as HTMLImageElement;

                      if (imageElement.src !== '/question-mark.png') {
                        imageElement.onerror = null;
                        imageElement.src = '/question-mark.png';
                      }
                    }}
                  />
                  <div className="name">
                    {member.name}
                    {member.pseudo ? ` (${member.pseudo})` : ''}
                  </div>
                  <div className="role">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Organisers;
