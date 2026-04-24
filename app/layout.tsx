import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header/Header";

const vazir = localFont({
  src: [
    {
      path: "./font/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BANDAREMAN-ALPHA",
  description: "My Next.js App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.variable}>
  <div className="app-wrapper">
    <div className="mobile-container">
      <Header />
      {children}
    </div>
  </div>
</body>

    </html>
  );
}
