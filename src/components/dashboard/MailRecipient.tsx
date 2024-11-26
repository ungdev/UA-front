'use client';
import styles from './MailRecipient.module.scss';

const MailRecipient = ({
  onClick = undefined,
  children = '',
}: {
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <button className={styles.mailRecipient} onClick={onClick}>
      {children}
    </button>
  );
};

export default MailRecipient;
