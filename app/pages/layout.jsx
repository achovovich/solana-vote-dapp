"use client";

import { Inter as FontSans } from "next/font/google"
import { useMemo } from "react";
import "../app/globals.css";
import AppWalletProvider from "../components/AppWalletProvider";
import { ThemeProvider } from "@/components/themeProvider"

import { cn } from "@/lib/utils"

import Header from '../components/Header';
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AppProvider } from "../context/context";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function Layout({ children }) {

    const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);
    const wallets = useMemo(
        () => [
            // 
        ],
        []
    );

    return (
        <div className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange >
                {/* <AppWalletProvider> */}
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            <AppProvider>
                                <main>
                                    <Header />
                                    <div className='flex flex-col items-center min-h-screen'>
                                        {children}
                                    </div >
                                </main >
                            </AppProvider>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
                {/* </AppWalletProvider> */}
            </ThemeProvider>
        </div>

    );
}

