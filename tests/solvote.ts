import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solvote } from "../target/types/solvote";
import { assert } from 'chai';

describe("solvote", () => {

  /* Global describe context */

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Solvote as Program<Solvote>;
  const systemProgram = anchor.web3.SystemProgram;
  const wallet = anchor.web3.Keypair.generate();

  console.log("Using program ID:", program.programId.toString());
  console.log("Using wallet address:", wallet.publicKey.toString());

  it("Should initialize the app", async () => {
    const tx = await program.methods.initApp().rpc();

    const [appAccountPDA, bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("app"),
      ],
      program.programId
    );

    //fetch the app account
    const app = await program.account.app.fetch(appAccountPDA);

    //check if the app account spacecount was correctly initialized
    assert.strictEqual(app.spaceCount, 0);
  });

  it("Should create a voting space", async () => {

    /* App info  */

    const [appAccountPDA, bump1] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("app"),
      ],
      program.programId
    );

    // //fetch the app account
    let app = await program.account.app.fetch(appAccountPDA);

    /* end App info */

    // Perform an airdrop to the wallet address
    const txAirdrop = await program.provider.connection.requestAirdrop(wallet.publicKey, 10000000000);
    await program.provider.connection.confirmTransaction(txAirdrop);

    const name = "My first space";

    const [spaceAccountPDA, bump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("space"),
        new Uint8Array(new Uint32Array([app.spaceCount + 1]).buffer),
      ],
      program.programId
    );

    const txHash = await program.methods
    .createSpace(name)
    .accounts({
      app: appAccountPDA,
      communitySpace : spaceAccountPDA,
      signer: wallet.publicKey,
      systemProgram: systemProgram.programId,
    })
    .signers([wallet])
    .rpc();

    await program.provider.connection.confirmTransaction(txHash);
    
    app = await program.account.app.fetch(appAccountPDA);
    assert.strictEqual(app.spaceCount, 1);

    let space = await program.account.communitySpace.fetch(spaceAccountPDA);
    assert.strictEqual(space.name, name);

  });

  it("Should create a proposal", async () => {
        /* App info  */

        const [appAccountPDA, bump1] =
        await anchor.web3.PublicKey.findProgramAddress(
          [
            Buffer.from("app"),
          ],
          program.programId
        );
    
        // //fetch the app account
        let app = await program.account.app.fetch(appAccountPDA);
    
        /* end App info */
    
        // Perform an airdrop to the wallet address
        // const txAirdrop = await program.provider.connection.requestAirdrop(wallet.publicKey, 10000000000);
        // await program.provider.connection.confirmTransaction(txAirdrop);
    
        // const name = "My first space";
    
        const [spaceAccountPDA, bump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [
            Buffer.from("space"),
            new Uint8Array(new Uint32Array([app.spaceCount + 1]).buffer),
          ],
          program.programId
        );

  });

});   