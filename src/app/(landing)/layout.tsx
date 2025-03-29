import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nearsoft - AC",
  description: "Nearsoft Open Account",
};

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header bgTextClass={"bgc-primary-50"}  />

        <div className="min-vh-100">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
