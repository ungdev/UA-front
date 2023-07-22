import React from 'react';
import Partners from '../components/Partners';

import Slider from '../components/landing/Slider';

const Home = () => {
  return (
    <div id="home">
      HOME
      <Slider
        slides={[
          <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>Test 1</div>,
          <div style={{ backgroundColor: 'green', width: '100%', height: '100%' }}>Test 2</div>,
          <div style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>Test 3</div>,
        ]}
      />
      <Partners />
    </div>
  );
};

export default Home;
