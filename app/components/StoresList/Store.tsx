import styles from "./Store.module.css";

type StoreType = {
  id: number;
  name: string;
  location: string;
  discount: number;
  image: string;
  Date: string;
};

export default function Store({ data }: { data: StoreType }) {
  return (
    <div className={styles.card}>
      
      <div className={styles.imageWrapper}>
        <img
          src={data.image}
          alt={data.name}
          className={styles.image}
        />

        {data.discount > 0 && (
          <div className={styles.discount}>
            تا <span className={styles.discountNumber}>{data.discount}</span>% تخفیف
          </div>
        )}

      </div>

      <div className={styles.info}>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.location}>{data.location}</p>
      </div>

    </div>
  );
}
