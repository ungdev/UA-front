import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { validate } from '../modules/register';

const Valid = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validate(slug));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Validation en cours
    </div>
  );
};

export default Valid;
