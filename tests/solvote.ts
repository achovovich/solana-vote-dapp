import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solvote } from "../target/types/solvote";
import { assert } from 'chai';
import { BN } from "bn.js";

describe("solvote", () => {

  /* Global describe context */

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Solvote as Program<Solvote>;
  const systemProgram = anchor.web3.SystemProgram;
  const wallet = anchor.web3.Keypair.generate();

  console.log("Using program ID:", program.programId.toString());
  console.log("Using wallet address:", wallet.publicKey.toString());

  const getAppAddress = async () => {
    const [appAccountPDA, bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("app"),
      ],
      program.programId
    );

    return appAccountPDA;
  }

  const getSpaceAddress = async (spaceCount: number) => {
    const [spaceAccountPDA, bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("space"),
        new Uint8Array(new Uint32Array([spaceCount]).buffer),
      ],
      program.programId
    );

    return spaceAccountPDA
  }

  const getProposalAddress = async (spaceAddress: anchor.web3.PublicKey, proposalCount: number) => {
    const [proposalAccountPDA, bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("proposal"),
        spaceAddress.toBuffer(),
        new Uint8Array(new Uint32Array([proposalCount]).buffer),
      ],
      program.programId
    );

    return proposalAccountPDA
  }

  const fetchApp = async () => {
    const appAddress = await getAppAddress();
    return await program.account.app.fetch(appAddress);
  }

  const fetchSpace = async (spaceCount: number) => {
    const spaceAddress = await getSpaceAddress(spaceCount);
    return await program.account.communitySpace.fetch(spaceAddress);
  }

  const fetchProposal = async (spaceAddress: anchor.web3.PublicKey, proposalCount: number) => {
    const proposalAddress = await getProposalAddress(spaceAddress, proposalCount);
    return await program.account.proposal.fetch(proposalAddress);
  }

  it("Should initialize the app", async () => {
    // Initialize the application
    const tx = await program.methods.initApp().rpc();

    //fetch the app account
    const app = await fetchApp();

    //check if the app account spacecount was correctly initialized
    assert.strictEqual(app.spaceCount, 0);
  });

  it("Should create a voting space", async () => {

    // //fetch the app account
    let app = await fetchApp();

    // Perform an airdrop to the wallet address
    const txAirdrop = await program.provider.connection.requestAirdrop(wallet.publicKey, 10000000000);
    await program.provider.connection.confirmTransaction(txAirdrop);

    const name = "My first space";

    const appAccount = await getAppAddress();
    const spaceAccount = await getSpaceAddress(app.spaceCount + 1);

    // Tx create space
    const txHash = await program.methods
    .createSpace(name)
    .accounts({
      app: appAccount,
      communitySpace : spaceAccount,
      signer: wallet.publicKey,
      systemProgram: systemProgram.programId,
    })
    .signers([wallet])
    .rpc();

    await program.provider.connection.confirmTransaction(txHash);
    
    app = await fetchApp();
    assert.strictEqual(app.spaceCount, 1);

    let space = await fetchSpace(app.spaceCount);
    assert.strictEqual(space.name, name);
    assert.strictEqual(space.proposalCount, 0);

  });

  it("Should create a proposal", async () => {
    
        let app = await fetchApp();
        const  appAddress = await getAppAddress();
        let space = await fetchSpace(app.spaceCount);
        const spaceAddress = await getSpaceAddress(app.spaceCount);
        const proposalAddress = await getProposalAddress(spaceAddress, space.proposalCount + 1);
        const title = "My first proposal";
        const description = "This is a description";
        const options = ["Option 1", "Option 2"];
        const deadline = new Date().getTime() + 1000 * 60 * 60 * 24 * 7; // 7 days from now in ms

        const txHash = await program.methods
        .createProposal(spaceAddress, title, description, options, new BN(deadline))
        .accounts({
          communitySpace : spaceAddress,
          proposal: proposalAddress,
          signer: wallet.publicKey,
          systemProgram: systemProgram.programId,
        })
        .signers([wallet])
        .rpc();
    
        await program.provider.connection.confirmTransaction(txHash);

        space = await fetchSpace(app.spaceCount);
        const proposal = await fetchProposal(spaceAddress, space.proposalCount);

        assert.strictEqual(space.proposalCount, 1);
        assert.strictEqual(proposal.title, title);
        assert.strictEqual(proposal.description, description);
        assert.strictEqual(proposal.options.length, options.length);
        assert.strictEqual(proposal.deadline.toNumber(), deadline);
        
  });

  

});   