"use client";

import Header from '../components/Header';
import { ProposalCard } from '../components/Cards/Proposal';
import { Register } from '../components/Cards/Register';
import { useAnchorWallet, ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

// import { useMemo } from "react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   PhantomWalletAdapter,
// } from "@solana/wallet-adapter-wallets";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";

// import ViewVote from '@/components/Votes/ViewVotes';
// import Vote from '@/components/Votes/Vote';

// import { useAppContext } from "../context/context";

export default function Home() {

  const anchorWallet = useAnchorWallet();
  // const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);

  // const wallets = useMemo(
  //   () => [
  //     new PhantomWalletAdapter(),
  //   ],
  //   []
  // );

  // const { votes } = useAppContext();

  return (
    <main>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen'>

        {
          anchorWallet?.publicKey ? (

            <ProposalCard />
            // <>ici</>

          ) : (
            < Register />
            // <ViewVotes />            
          )
        }
      </div >

    </main >
  );
}
