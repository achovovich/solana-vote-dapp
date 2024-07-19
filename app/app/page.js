"use client";

import Header from '../components/Header';
import { ProposalCard } from '../components/Cards/Proposal';
import { Register } from '../components/Cards/Register';
import { useAnchorWallet, ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import SparklesText from "@/components/magicui/sparkles-text";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Home() {

  const anchorWallet = useAnchorWallet();

  return (
    <main>
      <Header />
      
      <div className='flex flex-col items-center  min-h-screen'>
        {/* <SparklesText text="Vox Liquida" className="m-4"/> */}
        <h1 className="m-4 text-8xl">Vox Liquida</h1>
        <GradualSpacing
          className="mt-4 font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-4xl md:leading-[5rem] sm:text-xs"
          text=" Une plateforme de vote"
        />
        <GradualSpacing
          className="mb-4 font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-4xl md:leading-[5rem] sm:text-xs"
          text=" sécurisée, décentralisée et transparente"
        />
        <img src="/vox_liquida3_transparent.png" alt="Vox Liquida" className="w-1/2 m-4" />
        <Link href="/spaces/list">
        <Button variant="outline" className="bg-purple-600">
          Parcourir les espaces de vote
        </Button>
        </Link>


        {/* <ProposalCard /> */}

        {/* {
          anchorWallet?.publicKey ? (
            <ProposalCard />            
          ) : (
            < Register />        
          )
        } */}
      </div >

    </main >
  );
}
