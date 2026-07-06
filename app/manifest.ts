import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bandareman",
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    lang: "fa",
    dir: "rtl",
    icons: [
      {
        src: "/icon/icon-192.png",
        sizes: "192x192"
      },
      {
        src: "/icon/icon-512.png",
        sizes: "512x512"
      },
      
    ]
  };
}
