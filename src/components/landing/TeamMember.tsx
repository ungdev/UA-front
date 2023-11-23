import styles from './TeamMember.module.scss';
import { Orga } from '@/types';

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
  image?: string | undefined;
}) {
  return (
    <div className={styles.member} style={{ '--team-color': color } as React.CSSProperties}>
      <div className={styles.imgContainer}>
        <div className={styles.imageFont}></div>
        <img
          src={
            image ??
            (member.photoFilename
              ? member.photoFilename
              : 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg')
          }
          alt={`${member.name ?? member.username}`}
        />
      </div>
      {member.name && <span>{member.name}</span>}
      {member.username && <span>{member.username}</span>}
      <span>{role === 'respo' ? 'Responsable' : 'Membre'}</span>
    </div>
  );
}
