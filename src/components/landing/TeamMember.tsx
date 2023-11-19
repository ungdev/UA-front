import styles from './TeamMember.module.scss';
import { getProfilePictureUrl } from '@/modules/users';

export default function TeamMember({
  member,
  role,
  color,
  image,
}: {
  member: {
    id: string;
    firstname: string;
    lastname: string;
  };
  role: 'respo' | 'member';
  color: string;
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
