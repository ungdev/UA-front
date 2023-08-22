import Link from 'next/link';
import { Button } from '../UI';

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
  <div id="panel-header">
    <div className="header">
      <div className="home-title">
        <p>{title}</p>
      </div>
    </div>
    <div className="nav">
      {links().map((link) => (
        <Link href={link.href} key={link.href}>
          <Button className={`nav-link ${link.href === pathname ? 'active' : ''}`}>
            <span>{link.title}</span>
          </Button>
        </Link>
      ))}
    </div>
  </div>
);

export default PanelHeader;
