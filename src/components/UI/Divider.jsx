import React from 'react';

const Divider = ({ is_white }) => {
  return (
    <div className={`divider ${is_white ? 'white' : ''}`}></div>
  );
};

export default Divider;
