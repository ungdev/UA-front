'use client';
import { Checkbox } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateSetting } from '@/modules/settings';
import styles from './style.module.scss';

const Settings = () => {
  const dispatch = useAppDispatch();
  const loginAllowed = useAppSelector((state) => state.settings.login);
  const shopAllowed = useAppSelector((state) => state.settings.shop);
  const trombiAllowed = useAppSelector((state) => state.settings.trombi);
  const ticketsAllowed = useAppSelector((state) => state.settings.tickets);

  const changeSetting = (setting: string, value: boolean) => {
    // TODO: add confirmation modal
    dispatch(updateSetting(setting, value));
  };

  const changeLogin = (value: boolean) => changeSetting('login', value);
  const changeShop = (value: boolean) => changeSetting('shop', value);
  const changeTrombi = (value: boolean) => changeSetting('trombi', value);
  const changeTickets = (value: boolean) => changeSetting('tickets', value);

  return (
    <div className={styles.settings}>
      <Checkbox label="Autoriser le login" onChange={changeLogin} value={loginAllowed} />
      <Checkbox label="Autoriser la boutique" onChange={changeShop} value={shopAllowed} />
      <Checkbox label="Autoriser le trombi" onChange={changeTrombi} value={trombiAllowed} />
      <Checkbox label="Autoriser l'affichage des billets" onChange={changeTickets} value={trombiAllowed} />
    </div>
  );
};

export default Settings;
