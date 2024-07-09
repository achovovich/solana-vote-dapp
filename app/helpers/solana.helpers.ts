import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function getSolanaBalance(publicKey: string): Promise<number> {
    const balanceLamport = await connection.getBalance(new PublicKey(publicKey));
    return balanceLamport / LAMPORTS_PER_SOL;
}