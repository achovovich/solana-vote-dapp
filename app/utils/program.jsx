import { AnchorProvider, Program } from "@project-serum/anchor";
import { PublicKey, Connection } from "@solana/web3.js";

import IDL from "./idl.json";
import { PROGRAM_ID, } from "./constants";

export const getProgram = (connection, wallet) => {
    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    const program = new Program(IDL, PROGRAM_ID, provider);
    return program;
};

export const getVoterAddress = async (votePublicKey, userPublicKey) => {
    return (
        await PublicKey.findProgramAddressSync( //+Sync
            [votePublicKey.toBuffer(), userPublicKey.toBuffer()],
            PROGRAM_ID
        )
    )[0];
};

export const getProgramAccounts = async () => {
    return (
        await Connection.getProgramAccounts(
            PROGRAM_ID
        )
    )[0];
};


export const getProposalAddress = async (spacePublicKey, index) => {
    spacePublicKey = new PublicKey(spacePublicKey);
    return (
        await PublicKey.findProgramAddressSync(
            [Buffer.from("proposal"), spacePublicKey.toBuffer(), new Uint8Array(new Uint32Array([index + 1]).buffer)],
            PROGRAM_ID
        )
    )[0];
};