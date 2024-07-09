import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import AppWalletProvider from "../components/AppWalletProvider";
import { ThemeProvider } from "@/components/themeProvider"

import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Sol Vote Dapp",
  description: "Alyra Solana Vote Dapp By Turing Team #26",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange >
          <AppWalletProvider>{children}</AppWalletProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
