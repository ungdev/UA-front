import React, { useState, useEffect } from 'react';

import { uploads } from '../utils/api';
const Home = () => {
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    const request = await uploads.get('/partners/list.json', true);

    setPartners(request.data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div id="home">
      HOME
    </div>
  );
};

export default Home;
