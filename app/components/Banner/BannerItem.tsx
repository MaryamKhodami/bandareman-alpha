"use client"
import Image from "next/image";
import { useState } from "react";
import style from "./BannerItem.module.css"

type prop = {
    image: string;
}
export default function BannerItem({ image }: prop) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={style.banner}>
      <div className={style.media}>
        {!loaded && <div className={style.skeleton} />}

        <Image
          src={image}
          alt="banner"
          fill
          loading="lazy"
          className={`${style.image} ${loaded ? style.imageVisible : style.imageHidden}`}
          onLoad={() => setLoaded(true)}
          
        />
      </div>
    </div>
  );
}