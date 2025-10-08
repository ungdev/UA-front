import styles from './TeamMember.module.scss';
import { uploadsUrl } from '@/utils/environment';
import { Commission, Orga } from '@/types';
import defaultImage from '@/../public/images/logo.webp';

export default function TeamMember({
  member,
  role,
  commission,
  image,
}: {
  /** The user to display. */
  member: Orga;
  /** Which role the user has, in the commission we are rendering this component for. */
  role: 'respo' | 'member';
  /** The commission that is represented. */
  commission: Commission;
  /** The image of the user. If no image is given, it will take the image at the default link. */
  image?: string;
}) {
  let roleDisplayed = '';
  if (commission.id === 'coord') {
    roleDisplayed = role === 'respo' ? 'Président' : 'Coordinateur.e';
  } else {
    roleDisplayed = role === 'respo' ? 'Responsable' : 'Membre';
  }
  return (
    <div className={styles.member} style={{ '--team-color': commission.color } as React.CSSProperties}>
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
      <span className={styles.role}>{roleDisplayed}</span>
    </div>
  );
}
