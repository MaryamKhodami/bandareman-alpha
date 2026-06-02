"use client";

import Image from "next/image";
import { useState } from "react";
import style from "./BannerItem.module.css";

type Props = {
  image: string;
};

export default function BannerItem({ image }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={style.banner}>
      <div className={style.media}>
        <Image
          src={image}
          alt="banner"
          fill
          loading="lazy"
          className={`${style.image} ${
            loaded ? style.imageVisible : style.imageHidden
          }`}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
