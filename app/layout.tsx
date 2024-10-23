import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hovered Maps",
  description: "This website is for a assignment given my 1acre.in",
  creator: "Manas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
