'use client';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { validate } from '@/modules/register';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { type Action } from '@reduxjs/toolkit';
import { Loader } from '@/components/UI';
import { setRedirect } from '@/modules/redirect';
import { toast } from 'react-toastify';

interface SearchParams extends ReadonlyURLSearchParams {
  action?: string;
  state?: string;
}

const Discord = () => {
  const params = useParams();
  const { replace } = useRouter();
  const query: SearchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const slug = params.slug;

  const isSpectator = useAppSelector((state) => state.login.status.spectator);
  const hasTeam = useAppSelector((state) => state.login.status.team);

  useEffect(() => {
    dispatch(validate(slug as string) as unknown as Action);
    replace(pathname);
  }, []);

  useEffect(() => {
    if (query.action === 'oauth') {
      switch (query.state) {
        case '0':
          toast.success('Le lien avec le compte Discord a bien été créé !');
          toast.success('Tes rôles Discord te seront bientôt attribués !');
          break;
        case '1':
          toast.success('Le lien avec le compte Discord a bien été mis à jour !');
          toast.success('Tes rôles Discord te seront bientôt attribués !');
          break;
        case '2':
          toast.success("Le lien avec le compte Discord n'a pas été modifié");
          break;
        case '3':
          toast.error("Ce compte Discord est déjà lié au compte d'un autre utilisateur");
          break;
        case '4':
          toast.error("Tu as refusé à nos services l'accès à ton compte Discord");
          break;
        case '5':
          toast.error('Une erreur de requête est survenue');
          break;
        case '6':
          toast.error('Une erreur inconnue est survenue');
          break;
        default:
          break;
      }

      if (!isSpectator && !hasTeam) {
        dispatch(setRedirect('/dashboard/register'));
      } else {
        dispatch(setRedirect('/dashboard/account'));
      }
    }
  }, []);

  return <Loader />;
};

export default Discord;
