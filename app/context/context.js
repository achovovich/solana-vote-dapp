import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { BN } from "bn.js";
import { getProgram, getVoterAddress, getProgramAccounts } from "../utils/program";
import { confirmTx, mockWallet } from "../utils/helper";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const program = useMemo(() => {
        if (connection) {
            return getProgram(connection, wallet ?? mockWallet());
        }
    }, [connection, wallet]);

    useEffect(() => {
        if (votes.length == 0) {
            viewVotes();
        }
    }, [program]);

    const [votes, setVotes] = useState([]);    

    const viewVotes = async () => {
        const votes = await program.account.proposal.all();
        setVotes(votes);
    }

    const createVote = async (title, description, optionsArray, deadline) => {

        const proposalKeypair = Keypair.generate();
        const tx = await program.methods
            .createProposal(title, description, optionsArray, new BN(deadline))
            .accounts({
                signer: wallet.publicKey,
                proposal: proposalKeypair.publicKey,
                systemProgram: SystemProgram.programId
            })
            .signers([proposalKeypair])
            .rpc();

        console.log("tx", tx)
        await confirmTx(tx, connection)
        viewVotes();

    };

    const vote = async (index, proposalPubkey) => {

        const voterAddress = await getVoterAddress(proposalPubkey, wallet.publicKey)

        const tx = await program.methods
            .vote(index)
            .accounts({
                signer: wallet.publicKey,
                proposal: proposalPubkey,
                voter: voterAddress,
                systemProgram: SystemProgram.programId
            })
            .rpc();

        console.log("tx", tx)
        await confirmTx(tx, connection)
        viewVotes();
    };

    // TODO BONUS nouvelle fonctionnalité
    // Récupérer si l'utilisateur a déjà voté pour l'afficher à côté de l'option correspondante
    // Indice 1 : Faire un appel au smart contract pour récupérer le Voter account s'il existe (publickey généré avec la seed voteAccount + userWallet)



















    const accounts = async () => {        
        const account = await getProgramAccounts();                
    };

    return (
        <AppContext.Provider
            value={{
                createVote,
                viewVotes,
                vote,
                votes,
                accounts,
                error,
                success
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
