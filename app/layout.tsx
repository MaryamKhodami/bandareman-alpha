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
  title: "My App",
  description: "My Next.js App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body
      className={vazir.variable}
        style={{
          margin: 0,
          background: "#f2f2f2",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          overflowY: "hidden",
          overflowX: "visible"
          
        }}
      >
        <div className="mobile-container">
          <Header />
          {children}
        </div>

        <style>{`
          .mobile-container{
            width:390px;
            height:100vh;
            background:#fff;
            overflow-y:auto;
            overflow-x:visible;
            border-radius:12px;
            box-shadow:0 0 20px rgba(0,0,0,0.08);
            scrollbar-width:none;
            -ms-overflow-style:none;
            position: relative;
          }

          .mobile-container::-webkit-scrollbar{
            display:none;
          }

          @media (max-width: 768px){
            .mobile-container{
              width:100%;
              border-radius:0;
              box-shadow:none;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
