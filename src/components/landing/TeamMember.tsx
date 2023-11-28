import styles from './TeamMember.module.scss';
import { uploadsUrl } from '@/utils/environment';
import { Orga } from '@/types';
import defaultImage from '@/../public/images/logo.webp';

export default function TeamMember({
  member,
  role,
  color,
  image,
}: {
  /** The user to display. */
  member: Orga;
  /** Which role the user has, in the commission we are rendering this component for. */
  role: 'respo' | 'member';
  /** The color that represents the commission we are rendering. */
  color: string;
  /** The image of the user. If no image is given, it will take the image at the default link. */
  image?: string;
}) {
  return (
    <div className={styles.member} style={{ '--team-color': color } as React.CSSProperties}>
      <div className={styles.imgContainer}>
        <div className={styles.imageFont}></div>
        <div className={styles.imageBackground}>
          <img
            src={
              image ?? (member.photoFilename ? `${uploadsUrl()}/orga/${member.photoFilename}.webp` : defaultImage.src)
            }
            className={!member.photoFilename && !image ? styles.defaultImage : ''}
            alt={`${member.name ?? member.username}`}
          />
        </div>
      </div>
      {member.name && <span>{member.name}</span>}
      {member.username && <span>{member.username}</span>}
      <span className={styles.role}>{role === 'respo' ? 'Responsable' : 'Membre'}</span>
    </div>
  );
}
