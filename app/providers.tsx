"use client";

import { CartProvider } from "@/app/Context/CartContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
