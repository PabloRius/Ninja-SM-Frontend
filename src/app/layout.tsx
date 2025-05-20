import Footer from "@/components/footer";
import Header from "@/components/header";
import { ProfileProvider } from "@/providers/profile-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PriceWise - UK Supermarket Comparison",
  description: "Compare prices across UK supermarkets and find the best deals",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/favicon-dark.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SessionProvider>
          <ProfileProvider>
            <Toaster />
            <Header />
            <main className="flex flex-col flex-1">{children}</main>
            <Footer />
          </ProfileProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
