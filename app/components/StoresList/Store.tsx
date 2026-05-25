import styles from "./Store.module.css";

export interface StoreType {
  id: number;
  title: string;
  location: string;
  discount: number;
  image: string;
 
}

export default function Store({ data }: { data: StoreType }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={data.image}
          alt={data.title}
          className={styles.image}
        />
        {data.discount > 0 && (
          <div className={styles.discount}>
            تا <span className={styles.discountNumber}>{data.discount}%</span> تخفیف
          </div>
          )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{data.title}</p>
        <p className={styles.location}>{data.location}</p>
      </div>
    </div>
  );
}