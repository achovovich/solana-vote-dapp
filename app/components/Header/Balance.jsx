import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { getSolanaBalance } from '../../helpers/solana.helpers';

export default function Balance() {

    const wallet = useWallet();
    const [solanaBalance, setSolanaBalance] = useState(null);

    useEffect(() => {
        if (wallet.publicKey) {
            getSolanaBalance(wallet.publicKey.toBase58()).then((balance) => {
                setSolanaBalance(balance);
            })

        } else {
            setSolanaBalance(null);
        }
    }, [wallet.publicKey])

    return (
        <div>
            {
                solanaBalance !== null && (
                    <div id="balance" className='text-purple-600 m-2 font-bold'>
                        <p>Balance: {solanaBalance} SOL</p>
                    </div>
                )
            }
        </div>
    )
}