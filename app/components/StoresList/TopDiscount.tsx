"use client";

import Store from "./Store";
import List from "@/app/components/List/List";

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

  const filtered = stores.filter((s) => s.discount > 0);
  const sorted = filtered.sort((a, b) => b.discount - a.discount);
  return (
    <List
      title="پُرتخفیف‌ترین‌ها"
      showMore
      items={sorted}
      itemWidth={90}
      gap={12}
      renderItem={(store) => <Store data={store} />}
    />
  );
}
