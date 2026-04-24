"use client";

import Store from "./Store";
import styles from "./Store.module.css";

type StoreType = {
  id: number;
  name: string;
  location: string;
  discount: number;
  image: string;
  Date: string;
};

type Props = {
  stores: StoreType[];
};

export default function Newest({ stores }: Props) {

  const newest = [...stores].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <h3 className={styles.title}>جدیدترین ‌ها</h3>
        <button className={styles.all}>مشاهده ی همه</button>
      </div>

      <div className={styles.list}>
        {newest.map((store) => (
          <Store key={store.id} data={store} />
        ))}
      </div>

    </div>
  );
}
