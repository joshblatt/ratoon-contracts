import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Ratoon } from "../target/types/ratoon";

describe("ratoon", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Ratoon as Program<Ratoon>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
