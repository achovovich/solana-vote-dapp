import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { BN } from "bn.js";
import { getProgram, getVoterAddress, getProgramAccounts } from "../utils/program";
import { confirmTx, mockWallet } from "../utils/helper";
// import { cp } from "fs";

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








    
    useEffect(() => {

        if (proposals.length == 0) {
            getProposals();
        }

        if (spaces.length == 0) {            
            viewSpaces();            
        }        

    }, [program]);


    const [proposals, setProposals] = useState([]);    
    const getProposals = async () => {
        const proposals = await program.account.proposal.all();
        setProposals(proposals);
    }
    
    const [spaces, setSpaces] = useState([]);    
    const viewSpaces = async () => {        
        const spaces = await program.account.communitySpace.all();       
        setSpaces(spaces);
    }

    // const [space, setSpace] = useState(["data"]);    
    const getSpace = async (pubKey) => {        
        return (
            await program.account.communitySpace.fetch(pubKey)
        )        
    }

    const getProposal = async (pubKey) => {        
        return (
            await program.account.proposal.fetch(pubKey)
        )        
    }

    const accounts = async () => {        
        const account = await getProgramAccounts();                
    };

    return (
        <AppContext.Provider
            value={{
                createVote,                
                vote,                
                accounts,
                proposals,
                getProposal,
                spaces,
                viewSpaces,
                getSpace,
                program,
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
