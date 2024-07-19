"use client";

import React from 'react'
import dynamic from 'next/dynamic';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Balance from './Header/Balance';
import Nav from './Header/Nav';
import Logo from './Header/Logo';
import Link from 'next/link';

const WalletMultiButtonNoSSR = dynamic(
    (WalletMultiButton) => import('@solana/wallet-adapter-react-ui'),
    { ssr: false }
);

export default function Header() {
    return (
        <div id="Header" className="w-full top-0 flex justify-between p-2 items-center mb-3" >
            <div id="left" className='flex '>
                <Link href="/" className='flex flex-row items-center'>
                    <Logo />
                    <h1 className='text-2xl font-bold pl-2'>Vox Liquida</h1>
                </Link>
                {/* <Nav /> */}
            </div>
            <div className='flex flex-row items-center'>
                <Balance />
                {/* <WalletMultiButton /> */}
            </div>
        </div >
    )
}


