import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { validate } from '../../../modules/register';
import { useAppDispatch } from '@/lib/hooks';
import { Action } from '@reduxjs/toolkit';

const Valid = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(validate(slug as string) as unknown as Action);
  }, []);

  return <div>Validation en cours</div>;
};

export default Valid;
