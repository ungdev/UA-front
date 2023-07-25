import React from 'react';

const Divider = ({ is_white = false }: { is_white?: boolean }) => {
  return (
    <div className={`divider ${is_white ? 'white' : ''}`}></div>
  );
};

export default Divider;
