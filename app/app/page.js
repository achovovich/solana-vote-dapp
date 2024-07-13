"use client";

import Header from '../components/Header';
import { ProposalCard } from '../components/Cards/Proposal';
import { Register } from '../components/Cards/Register';
import { useAnchorWallet, ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

export default function Home() {

  const anchorWallet = useAnchorWallet();

  return (
    <main>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen'>

        {
          anchorWallet?.publicKey ? (
            <ProposalCard />            
          ) : (
            < Register />        
          )
        }
      </div >

    </main >
  );
}
