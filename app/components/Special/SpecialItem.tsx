import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SpecialItem.module.css";

type Props = {
  title: string;
  store: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  image: string;
  expire: string;
};

export default function SpecialOfferItem({
  title,
  store,
  oldPrice,
  newPrice,
  discount,
  image,
  expire,
}: Props) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const target = new Date(expire).getTime();
      let diff = target - now;

      if (diff <= 0) {
        setRemaining("00:00:00:00");
        return;
      }
      const d = Math.floor(diff / 1000 / 60 / 60 / 24);
      const h = Math.floor(diff / 1000 / 60 / 60 % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      const pad = (n : any ) => String(n).padStart(2, "0");

    setRemaining(`${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`);
  }, 1000);


    return () => clearInterval(interval);
  }, [expire]);

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="140px"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.store}>{store}</p>

        <div className={styles.timer}>
          <span className={styles.timerIcon}></span>
          <span className={styles.timerText}>{remaining} تا اتمام پیشنهاد</span>
        </div>
      </div>

      <div className={styles.discount}>
        <div className={styles.discountTag}>{discount}% تخفیف</div>
        <div className={styles.oldPrice}>{oldPrice.toLocaleString()} تومان</div>
        <div className={styles.newPrice}>{newPrice.toLocaleString()} تومان</div>
      </div> 

    </div>
  );
}
