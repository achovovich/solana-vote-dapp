"use client"

import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Balance from './Header/Balance';
import Nav from './Header/Nav';
import Logo from './Header/Logo';

export default function Header() {
    return (
        <div id="Header" className="w-full top-0 flex justify-between p-2 items-center mb-3" >
            <div id="left" className='flex flex-row'>
                <Logo />
                <h1 className='text-2xl font-bold'>Sol'Vote</h1>
                <Nav />
            </div>
            <div className='flex flex-row-reverse items-center'>
                <WalletMultiButton />
                <Balance />
            </div>
        </div >
    )
}


