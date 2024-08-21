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

  const changeSetting = (setting: string, value: boolean) => {
    // TODO: add confirmation modal
    dispatch(updateSetting(setting, value));
  };

  const changeLogin = (value: boolean) => changeSetting('login', value);
  const changeShop = (value: boolean) => changeSetting('shop', value);
  const changeTrombi = (value: boolean) => changeSetting('trombi', value);

  return (
    <div className={styles.settings}>
      <Checkbox label="Autoriser le login" onChange={changeLogin} value={loginAllowed} />
      <Checkbox label="Autoriser la boutique" onChange={changeShop} value={shopAllowed} />
      <Checkbox label="Autoriser le trombi" onChange={changeTrombi} value={trombiAllowed} />
    </div>
  );
};

export default Settings;
