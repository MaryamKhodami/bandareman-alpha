import styles from "./Reels.module.css";
import { reels } from "@/data/reel";
import ReelItem from "./ReelItem";

export default function Reels() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
         ببین و تماشا کن
      </div>

      <div className={styles.scroller}>
        {reels.map((item) => (
          <ReelItem
            key={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
}
