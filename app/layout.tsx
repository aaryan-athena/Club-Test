import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WWP South Math Club Resources",
  description: "Curated resources for high school mathematics competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
