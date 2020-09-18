import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { validate } from '../../modules/register';

const Valid = () => {
  const router = useRouter();
  const { slug } = router.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validate(slug));
  }, []);

  return <div>Validation en cours</div>;
};

export default Valid;
