'use client';
import { useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { validate } from '@/modules/register';
import { useAppDispatch } from '@/lib/hooks';
import { type Action } from '@reduxjs/toolkit';

const Valid = () => {
  const params = useParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const slug = params.slug;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(validate(slug as string) as unknown as Action);
    replace(pathname);
  }, []);

  return <div>Validation en cours</div>;
};

export default Valid;
