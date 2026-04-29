"use client";
import styles from "./List.module.css";

type ListProps<T> = {
  title?: string;
  showMore?: boolean;
  moreText?: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
  paddingX?: number;
};
export default function List<T>({
  title,
  showMore = false,
  moreText = "مشاهده‌ همه",
  items,
  renderItem,
  itemWidth = 120,
  gap = 12,
  paddingX = 16,
}: ListProps<T>) {
  return (
    <div className={styles.wrapper}>

      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          {showMore && (
            <button className={styles.more}>{moreText}</button>
          )}
        </div>
      )}

      <div
        className={styles.scroller}
        style={{
          gap: `${gap}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.item}
            style={{
              width: `${itemWidth}px`,
        
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}