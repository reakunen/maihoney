import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maihoney.com"),
  title: "Mai Honey | Raw Backyard Honey from San Lorenzo",
  description: "Small-batch raw and unfiltered honey produced by a father-and-son beekeeping team in San Lorenzo, California.",
  keywords: ["raw honey San Lorenzo", "local East Bay honey", "unfiltered California honey", "backyard honey"],
  openGraph: {
    title: "Mai Honey | Pure honey, close to home.",
    description: "Small-batch backyard honey from San Lorenzo, California.",
    type: "website",
    images: [{ url: "/assets/hives-hero.jpg", width: 1200, height: 800, alt: "Mai Honey backyard beekeeping" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
