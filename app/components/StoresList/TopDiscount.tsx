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

export default function TopDiscount({ stores }: Props) {

  const filtered = stores.filter(store => store.discount > 0);
  const sortedByDiscount = [...filtered].sort(
    (a, b) => b.discount - a.discount
  );

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <h3 className={styles.title}>پُر تخفیف‌ترین‌ها</h3>
        <button className={styles.all}>مشاهده ی همه</button>
      </div>

      <div className={styles.list}>
        {sortedByDiscount.map((store) => (
          <Store key={store.id} data={store} />
        ))}
      </div>

    </div>
  );
}
