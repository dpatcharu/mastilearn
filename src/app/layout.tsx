import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeVerse",
  description: "Learn, grow, and discover inspiring everyday ideas."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
