import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { BN } from "bn.js";
import { getProgram, getVoterAddress, getProgramAccounts, getProposalAddress, getSpaceAddress } from "../utils/program";
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

    // =============================================================================================
    // A P P  ======================================================================================
    const getApp = async () => {        
        return (
            await program.account.app.all()
        )[0]
    }
    
    // =============================================================================================
    // S P A C E S =================================================================================
    const [spaces, setSpaces] = useState([]);    
    const viewSpaces = async () => {        
        const spaces = await program.account.communitySpace.all();       
        setSpaces(spaces);
    }
    
    const getSpace = async (pubKey) => {        
        return (
            await program.account.communitySpace.fetch(pubKey)
        )        
    }

    const loadSpaceProposals = async (spaceKey, proposalCount) => {

        let tmpProposal;
        let proposalList = [];

        for (let i = 0; i < proposalCount; i++) {
            const proposalPubKey = await getProposalAddress(spaceKey, i);
            tmpProposal = await getProposal(proposalPubKey.toString());
            tmpProposal.publicKey = proposalPubKey.toString();
            proposalList.push(tmpProposal);
        }
        return proposalList        
    };

    const createSpace = async (title, appPublicKey, index) => {
        try {
            const spacePublicKey = await getSpaceAddress(index);
            if (!spacePublicKey) {
                console.error("spacePublicKey is undefined");
                return;
            }
            console.log("spacePublicKey", spacePublicKey.toBase58())

            console.log("title + index", title, index)

            if (!appPublicKey || !appPublicKey.publicKey) {
                console.error("appPublicKey or appPublicKey.publicKey is undefined");
                return;
            }        
            console.log("appPublicKey", appPublicKey)

            if (!wallet || !wallet.publicKey) {
                console.error("wallet or wallet.publicKey is undefined");
                return;
            }
            console.log("wallet.publicKey", wallet.publicKey);

            console.log("SystemProgram.programId", SystemProgram.programId)
            

            // let utf8Encode = new TextEncoder();
            // title = utf8Encode.encode(title);        
            // title = stringToU8Array16(title);

            const tx = await program.methods
                .createSpace(title)
                .accounts({
                    app: appPublicKey.publicKey, //OK sinon rong input type for account "app" in the instruction accounts object for instruction "createSpace". Expected PublicKey or string.
                    communitySpace: spacePublicKey,  
                    signer: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                })
                .signers([wallet, spacePublicKey])//[appPublicKey, spacePublicKey]
                .rpc();

            // // console.log("tx", tx)
            await confirmTx(tx, connection)    
        } catch (error) {
            console.error("Error in createSpace:", error);
        }    
    };

    // =============================================================================================
    // P R O P O S A L S ===========================================================================
    const [proposals, setProposals] = useState([]);    
    const getProposals = async () => {
        const proposals = await program.account.proposal.all();
        setProposals(proposals);
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
                getApp,
                createVote,                
                vote,                
                accounts,
                proposals,
                getProposal,
                loadSpaceProposals,
                createSpace,
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
