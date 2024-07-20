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



    const createVoteOLD = async (title, description, optionsArray, deadline) => {

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

    const voteOLD = async (index, proposalPubkey) => {

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








    
    // useEffect(() => {

        // if (proposals.length == 0) {
        //     // getProposals();
        // }

        // if (spaces.length == 0) {            
        //     viewSpaces();            
        // }        

    // }, [program]);

    // =============================================================================================
    // A P P  ======================================================================================
    const getApp = async (key) => {        
        let app = (
            await program.account.app.fetch(key)
        )
        app.publicKey = key;
        return app;
    }
    
    // =============================================================================================
    // S P A C E S =================================================================================    
    const getSpaces = async () => {        
        const spaces = await program.account.communitySpace.all();               
        return spaces;
    }
    
    const getSpace = async (pubKey) => {        
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
        console.log('get P:', pubKey)       
        let p = (
            await program.account.proposal.fetch(pubKey)
        )
        p.publicKey = pubKey;
        
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
        }    
    };

    const loadSpaceProposals = async (spaceKey, proposalCount) => {

        let tmpProposal;
        let proposalList = [];
        console.log('space', spaceKey, proposalCount)
        for (let i = 0; i < proposalCount; i++) {            
            const proposalPubKey = await getProposalAddress(spaceKey, i);
            console.log('P key:', proposalPubKey.toBase58(), i)
            tmpProposal = await getProposal(proposalPubKey.toString());
            tmpProposal.publicKey = proposalPubKey.toString();
            console.log('tmpProposal', tmpProposal)
            proposalList.push(tmpProposal);
        }
        return proposalList        
    };
    
    // =============================================================================================
    // V O T E S  ==================================================================================
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
        }    
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
                // vote,                
                // accounts,
                // proposals,
                getProposal,
                // getProposals,
                loadSpaceProposals,
                createProposal,
                createSpace,
                // spaces,
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
