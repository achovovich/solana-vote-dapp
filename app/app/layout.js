import "./globals.css";
import { Inter as FontSans } from "next/font/google"

import AppWalletProvider from "../components/AppWalletProvider";
import { ThemeProvider } from "@/components/themeProvider"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Liquid Democracy",
  description: "Alyra Solana Vote Dapp By Turing Team #26",
};

export default function RootLayout({ children }) {
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
