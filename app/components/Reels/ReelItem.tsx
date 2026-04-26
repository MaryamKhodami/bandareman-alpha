import styles from "./ReelItem.module.css";

type Props = {
  title: string;
  thumbnail: string;
  time: string;
};

export default function ReelItem({ title, thumbnail, time }: Props) {
  return (
    <div className={styles.card}>
      <img src={thumbnail} className={styles.image} />

      <div className={styles.play}>
        ▶
      </div>

      <div className={styles.time}>{time}</div>

      <div className={styles.title}>{title}</div>
    </div>
  );
}
