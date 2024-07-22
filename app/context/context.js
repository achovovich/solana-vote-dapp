import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { getProgram, getVoterAddress, getProgramAccounts, getProposalAddress, getSpaceAddress } from "../utils/program";
import { confirmTx, mockWallet } from "../utils/helper";
// import { cp } from "fs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [refresh, setRefresh] = useState(false);

    const { connection } = useConnection();

    const wallet = useAnchorWallet();//useWallet();
    const program = useMemo(() => {
        if (connection) {
            return getProgram(connection, wallet ?? mockWallet());
        }
    }, [connection, wallet]);


    // =============================================================================================
    // A P P  ======================================================================================
    const getApp = async (pubKey) => {    
        if (!pubKey) {return;}   
        
        let app = (
            await program.account.app.fetch(pubKey)
        )
        app.publicKey = pubKey;
        return app;
    }
    
    // =============================================================================================
    // S P A C E S =================================================================================    
    const getSpaces = async () => {        
        const spaces = await program.account.communitySpace.all();               
        return spaces;
    }
    
    const getSpace = async (pubKey) => {     
        if (!pubKey) {return;}   

        let space = (
            await program.account.communitySpace.fetch(pubKey)
        )        
        space.publicKey = pubKey;
        return space;
    }

    const createSpace = async (title, app) => {
        try {            
            const spacePublicKey = await getSpaceAddress(app.spaceCount);
            if (!spacePublicKey) {
                console.error("spacePublicKey is undefined");
                return;
            }

            if (!app) {
                console.error("app is undefined");
                return;
            }        

            if (!app.publicKey) {
                console.error("app.publicKey is undefined");
                return;
            }                           

            if (!wallet || !wallet.publicKey) {
                console.error("wallet or wallet.publicKey is undefined");
                return;
            }

            const tx = await program.methods
                .createSpace(title)
                .accounts({
                    app: app.publicKey, 
                    communitySpace: new PublicKey(spacePublicKey),  
                    signer: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                })
                .signers([])
                .rpc();

            console.log("tx", tx)

            await confirmTx(tx, connection)

        } catch (error) {
            console.error("Error in createSpace:", error);
        }    
    };

    // =============================================================================================
    // P R O P O S A L S ===========================================================================
    // const [proposals, setProposals] = useState([]);    
    const getProposals = async () => {
        const proposals = await program.account.proposal.all();
        // setProposals(proposals);
        return proposals;
    }

    const getProposal = async (pubKey) => {                    
        if (!pubKey) {return;}
        
        let p = (
            await program.account.proposal.fetch(pubKey)
        )
        if (p) { p.publicKey = pubKey; }
        
        return p;
    }
    
    const createProposal = async (title, desc, options, deadline, space) => {
        try {            
            const propPublicKey = await getProposalAddress(space.publicKey, space.proposalCount);

            if (!propPublicKey) {
                console.error("propPublicKey is undefined");
                return;
            }

            if (!space) {
                console.error("space is undefined");
                return;
            }        

            if (!space.publicKey) {
                console.error("app.publicKey is undefined");
                return;
            }                           

            if (!wallet || !wallet.publicKey) {
                console.error("wallet or wallet.publicKey is undefined");
                return;
            }                        

            const tx = await program.methods
                .createProposal(new PublicKey(space.publicKey), title, desc, options, new BN(deadline))
                .accounts({
                    communitySpace: new PublicKey(space.publicKey), 
                    proposal: new PublicKey(propPublicKey),  
                    signer: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                })
                .signers([])
                .rpc();

            console.log("tx", tx)
            await confirmTx(tx, connection)

        } catch (error) {
            console.error("Error in createProposal:", error);
            return 'Erreur lors de la création du vote';
        }
        return '';    
    };

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
    
    // =============================================================================================
    // V O T E S  ==================================================================================
    const getUserVote = async (propPublicKey) => { 
        let pk = new PublicKey(propPublicKey);  
        const votePublicKey = await getVoterAddress(pk, wallet.publicKey);           
        
        let v = (
            await program.account.vote.fetch(votePublicKey)
        )
        v.publicKey = votePublicKey;
        
        return v;
    }

    const createVote = async (options, propPublicKey) => {
        try {                       
            const votePublicKey = await getVoterAddress(propPublicKey, wallet.publicKey);
            console.log('votePublicKey', votePublicKey)
            if (!propPublicKey) {
                console.error("propPublicKey is undefined");
                return;
            }
                        
            if (!wallet || !wallet.publicKey) {
                console.error("wallet or wallet.publicKey is undefined");
                return;
            }                                        

            const tx = await program.methods
                .castVote(options)                
                .accounts({
                    vote: new PublicKey(votePublicKey), 
                    proposal: new PublicKey(propPublicKey),  
                    signer: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                })
                .signers([])
                .rpc();

            console.log("tx", tx)
            await confirmTx(tx, connection)

        } catch (error) {
            console.error("Error in createVote:", error);
            return 'Erreur lors de la création du vote';
        }
        return '';    
    };

    // =============================================================================================
    // const accounts = async () => {        
    //     const account = await getProgramAccounts();                
    // };

    return (
        <AppContext.Provider
            value={{
                refresh,
                setRefresh,
                getApp,
                createVote,
                getUserVote,
                getProposal,                
                loadSpaceProposals,
                createProposal,
                createSpace,                
                getSpaces,
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
