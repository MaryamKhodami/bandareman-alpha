"use client";

import List from "@/app/components/List/List";
import Product, { ProductType } from "./Product";

interface ProductsListProps {
  title?: string;
  showMore?: boolean;
  items: ProductType[];
}

export default function ProductsList({
  title,
  showMore,
  items,
}: ProductsListProps) {
  return (
    <List
      title={title}
      showMore={showMore}
      items={items}
      itemWidth={90}
      gap={12}
      renderItem={(product) => <Product data={product} />}
    />
  );
}
