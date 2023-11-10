import styles from './TeamMember.module.scss';

export default function TeamMember({
  member,
  color,
}: {
  member: {
    name: string;
    job: string;
    image: string;
  };
  color: string;
}) {
  return (
    <div className={styles.member} style={{ '--team-color': color } as React.CSSProperties}>
      <div className={styles.imgContainer}>
        <div className={styles.imageFont}></div>
        <img src={member.image} alt={member.name} />
      </div>
      <span>{member.name}</span>
      <span>{member.job}</span>
    </div>
  );
}
