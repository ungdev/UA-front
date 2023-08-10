import Link from 'next/link';
import { Button } from '../UI';

const PanelHeader = ({
  pathname,
  links,
  title,
}: {
  pathname: string;
  links: () => { title: string; href: string }[];
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
