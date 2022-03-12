import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { 
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  AccountState,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Ratoon } from "../target/types/ratoon";

describe("ratoon", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Ratoon as Program<Ratoon>;

  const authority = anchor.web3.Keypair.generate();
  const merchant1 = anchor.web3.Keypair.generate();
  const merchant2 = anchor.web3.Keypair.generate();

  let lpMint = null;
  let merchant1_ata = null;
  let merchant2_ata = null;

  let merchant1_vault = null;
  let merchant2_vault = null;

  // constants
  const MERCHANT_VAULT_TAG = "merchant-vault-seed";

  it("Is Initialized", async () => {
    // Request Airdrop for user
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(authority.publicKey, 100000000),
      "confirmed"
    );
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(merchant1.publicKey, 100000000),
      "confirmed"
    );
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(merchant2.publicKey, 100000000),
      "confirmed"
    );
    lpMint = await createMint(
      provider.connection,
      authority,
      authority.publicKey,
      null,
      9,
    );
    merchant1_ata = await createAssociatedTokenAccount(
      provider.connection,
      authority,
      lpMint,
      merchant1.publicKey,
    )
    merchant2_ata = await createAssociatedTokenAccount(
      provider.connection,
      authority,
      lpMint,
      merchant2.publicKey,
    )

    console.log("lpMint =", lpMint);
    console.log("merchant1_ata =", merchant1_ata);
    console.log("merchant2_ata =", merchant2_ata);

    // await mintTo(
    //   provider.connection,
    //   authority,
    //   lpMint.publicKey,
    //   merchant1_ata.publicKey,
    //   authority.publicKey,
    //   1_000_000
    // );
    // await mintTo(
    //   provider.connection,
    //   authority,
    //   lpMint.publicKey,
    //   merchant2_ata.publicKey,
    //   authority.publicKey,
    //   1_000_000
    // );

  });
  it("Create Merchant Vault", async () => {
    
    const [merchantVaultKey, merchantVaultNonce] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(MERCHANT_VAULT_TAG), merchant1.publicKey.toBuffer()],
        program.programId,
      );
    const tx = await program.rpc.createMerchantVault({
      accounts: {
        authority: merchant1.publicKey,
        merchantVault: merchantVaultKey,
        mint: lpMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      },
      signers: [merchant1]
    });
    console.log("Your transaction signature", tx);

    const merchantVault = await program.account.merchantVault.fetch(merchantVaultKey);

  });
});
