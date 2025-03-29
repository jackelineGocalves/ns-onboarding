import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nearsoft - Open Account",
  description: "Nearsoft Open Account",
  robots: "noindex",
  icons: {
    icon: '/favicon-32x32.png',
    apple: ['/apple-touch-icon.png'],
   }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
