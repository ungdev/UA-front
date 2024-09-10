'use client';

const Potato = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stripeToken = urlParams.get('stripeToken');
  return <p>Voici le token : {stripeToken}</p>;
};

export default Potato;
