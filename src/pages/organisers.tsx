import React, { useEffect, useState } from 'react';

import { Title, Loader } from '../components/UI';
import { Organisers as OrganisersType } from '../types';
import { uploads } from '../utils/api';
import { uploadsUrl } from '../utils/environment';
import { getShortName } from '../utils/strings';

const Organisers = () => {
  const [organisers, setOrganisers] = useState<OrganisersType>();

  useEffect(() => {
    fetchOrganisers();
  }, []);

  const fetchOrganisers = async () => {
    const request = await uploads.get<OrganisersType>('/organisers/list.json');

    setOrganisers(request.data);
  };

  return (
    <div id="organisers">
      <Title align="center" className="uppercase">
        Organisateurs
      </Title>

      <p>
        Merci à tous les organisateurs qui permettent à ce magnifique événement d'exister. Ils sont tous bénévoles et
        étudiants à l'Université de Technologie de Troyes (UTT).
      </p>

      {!organisers ? (
        <Loader />
      ) : (
        organisers.map((commission) => (
          <div className="commission">
            <Title level={2}>{commission.title}</Title>
            <p>{commission.description}</p>

            <div className="members">
              {commission.members.map((member) => (
                <div className="member">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${uploadsUrl()}/organisers/${getShortName(
                        member.name,
                      )}.jpg), url(/question-mark.png)`,
                    }}
                  />
                  <div className="name">{member.name}</div>
                  <div>{member.pseudo}</div>
                  {/* <div className="role">{member.role}</div> */}
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
