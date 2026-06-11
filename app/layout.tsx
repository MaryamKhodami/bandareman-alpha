import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import Providers from "./providers";
interface User {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

interface HomeResponse {
  data: {
    user?: User;
  };
}

const vazir = localFont({
  src: [
    { path: "./font/Vazirmatn-Thin.woff2", weight: "100", style: "normal" },
    { path: "./font/Vazirmatn-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./font/Vazirmatn-Light.woff2", weight: "300", style: "normal" },
    { path: "./font/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "./font/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "./font/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./font/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
    { path: "./font/Vazirmatn-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./font/Vazirmatn-Black.woff2", weight: "900", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-Thin.woff2", weight: "100", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-Light.woff2", weight: "300", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-Regular.woff2", weight: "400", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-Medium.woff2", weight: "500", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-Bold.woff2", weight: "700", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./font/FD/Vazirmatn-FD-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BANDAREMAN-ALPHA",
  description: "My Next.js App",
};

async function getUser(): Promise<User | null> {
  try {
    const res = await fetch("https://api1.renn.ir/home", {
      cache: "no-store",
    });
    const json: HomeResponse = await res.json();
    return json.data.user || null;
  } catch {
    return null;
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
  <html lang="fa" dir="rtl">
    <body className={vazir.variable}>
      <Providers>
        <div className="app-mobile">
          <Header user={user} />
          {children}
        </div>
      </Providers>
    </body>
  </html>
);

}
