import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import AdminProvider from "@/context/admin_context";
import LeftNav from "@/components/leftnav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AXCEL",
  description: "Admin CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AdminProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className="layout-container">
            <LeftNav />
            <main className="main-body">{children}</main>
          </div>
        </body>
      </AdminProvider>
    </html>
  );
}
