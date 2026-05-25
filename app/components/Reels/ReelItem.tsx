import styles from "./ReelItem.module.css";

type Props = {
  title: string;
  thumbnail: string;
  duration?: number;
  published_at?: number;
};

export default function ReelItem({ title, thumbnail, duration =0, published_at }: Props) {
  const minutes = Math.floor(duration / 60);
  const seconds = (duration % 60).toString().padStart(2, '0');
  const displayTime = `${minutes}:${seconds}`;
  const displayDate = published_at 
    ? new Date(published_at * 1000).toLocaleDateString('fa-IR', {
      year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }) 
    : '';
  return (
    <div className={styles.card}>
      <img src={thumbnail} className={styles.image} alt={title} />
      <div className={styles.play}>
        ▶
      </div>
      <div className={styles.time}>{displayTime}</div>
      {published_at && <div className={styles.date}>{displayDate}</div>} 
      <div className={styles.title}>{title}</div>
    </div>
  );
}
