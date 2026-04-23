"use client"
import style from "./BannerItem.module.css"

type prop = {
    image: string;
}
export default function BannerItem({ image }: prop) {
  return (
    <div className={style.banner}>
      <img src={image} className={style.image} />
    </div>
  );
}