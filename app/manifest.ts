import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HER-STORY",
    short_name: "HER-STORY",
    description: "여정 전 과정을 안내하는 스마트 트래블 컨시어지",
    start_url: "/",
    display: "standalone",
    background_color: "#EEF9FD",
    theme_color: "#0EA5E9",
    icons: [
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
