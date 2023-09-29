import styles from './PanelHeader.module.scss';
import Link from 'next/link';
import { Button } from '@/components/UI';

/** The panel header */
const PanelHeader = ({
  pathname,
  links,
  title,
}: {
  /** The current pathname */
  pathname: string;
  /** The links */
  links: () => { title: string; href: string }[];
  /** The title */
  title: string;
}) => (
  <div id="panel-header" className={styles.panelHeader}>
    <div className={styles.header}>
      <div className={styles.homeTitle}>
        <p>{title}</p>
      </div>
    </div>
    <div className={styles.nav}>
      {links().map((link) => (
        <Link href={link.href} key={link.href}>
          <Button className={`${styles.navLink} ${link.href === pathname ? styles.active : ''}`}>
            <span>{link.title}</span>
          </Button>
        </Link>
      ))}
    </div>
  </div>
);

export default PanelHeader;
