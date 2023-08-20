'use client';
import { Checkbox } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateSetting } from '@/modules/settings';
import type { Action } from '@reduxjs/toolkit';

const Partners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => state.partners);

  return (
    <>
    </>
  );
};

export default Partners;
