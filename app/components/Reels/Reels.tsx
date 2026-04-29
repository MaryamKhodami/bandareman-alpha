"use client";

import List from "@/app/components/List/List";
import ReelItem from "./ReelItem";
import { reels } from "@/data/reel";

export default function Reels() {
  return (
    <List
      title="ببین و تماشا کن"
      items={reels}
      itemWidth={160}
      gap={12}
      renderItem={(item) => (
        <ReelItem
          title={item.title}
          thumbnail={item.thumbnail}
          time={item.time}
        />
      )}
    />
  );
}

