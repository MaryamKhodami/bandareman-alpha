import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SpecialItem.module.css";

type Props = {
  title: string;
  image: string;
  discount: number;
  original_price: number;
  discounted_price: number;
  expires_at: number;
  store: {
    title: string;
    location: string;
  };
};

export default function SpecialItem({
  title,
  image,
  discount,
  original_price,
  discounted_price,
  expires_at,
  store,
}: Props) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      let target = Number(expires_at);
      
      if (target < 100000000000) {
        target *= 1000;
      }
      
      const diff = target - now;

      if (diff <= 0) {
        setRemaining("00:00:00");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      const pad = (n: number) => String(n).padStart(2, "0");
      setRemaining(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expires_at]);

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <Image src={image} alt={title} fill sizes="140px" className={styles.image} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.store}>{store.title} ({store.location})</p>
        <div className={styles.timer}>
          <span className={styles.timerText}>{remaining} تا اتمام</span>
        </div>
      </div>

      <div className={styles.discount}>
        <div className={styles.discountTag}>{discount}%</div>
        <div className={styles.oldPrice}>{original_price.toLocaleString()}</div>
        <div className={styles.newPrice}>{discounted_price.toLocaleString()} تومان</div>
      </div>
    </div>
  );
}
