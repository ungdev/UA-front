import styles from './TeamMember.module.scss';
import { getProfilePictureUrl } from '@/modules/users';

export default function TeamMember({
  member,
  role,
  color,
  image,
}: {
  /** The user to display. */
  member: {
    id: string;
    firstname: string;
    lastname: string;
  };
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
        <img src={image ?? getProfilePictureUrl(member)} alt={`${member.firstname} ${member.lastname}`} />
      </div>
      <span>{`${member.firstname} ${member.lastname}`}</span>
      <span>{role === 'respo' ? 'Responsable' : 'Membre'}</span>
    </div>
  );
}
