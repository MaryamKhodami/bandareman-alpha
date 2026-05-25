"use client";

import List from "@/app/components/List/List";
import Store, { StoreType } from "./Store";

interface StoresListProps {
  title?: string;
  showMore?: boolean;
  items: StoreType[];
  slug?: string;
}

export default function StoresList({ title, showMore, items }: StoresListProps) {
  return (
    <List
      title={title}
      showMore={showMore}
      items={items}
      itemWidth={90}
      gap={12}
      renderItem={(store) => <Store data={store} />}
    />
  );
}