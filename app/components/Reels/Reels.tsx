"use client";

import List from "@/app/components/List/List";
import ReelItem from "./ReelItem";
interface ReelsProps {
  items?: any[];
  title?: string;
  slug?: string;
}

export default function Reels({ items, title }: ReelsProps) {
  if (!items || items.length === 0) return null;

  return (
    <List
      title={title}
      items={items}
      itemWidth={160}
      gap={12}
      renderItem={(item) => (
        <ReelItem
          key={item.id}
          title={item.title}
          thumbnail={item.thumbnail}
          duration={item.duration}
      />
      )}
    />
  );
}

