import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenkit",
  description: "Xenkit is a collection of React components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
