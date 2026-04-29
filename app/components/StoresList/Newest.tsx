"use client"
import List from "@/app/components/List/List";
import Store from "./Store";
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
}
export default function Newest({ stores }: Props) {
  const newest = [...stores].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );

  return (
    <List
      title="جدیدترین‌ها"
      showMore
      items={newest}
      itemWidth={90}
      gap={12}
      renderItem={(store) => <Store data={store} />}
    />
  );
}
