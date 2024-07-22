import { PublicKey } from "@solana/web3.js";

const PGM_ADDRESS = process.env.pgmAddress;
export { PGM_ADDRESS };

export const PROGRAM_ID = new PublicKey(PGM_ADDRESS);
