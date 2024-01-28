import web3 from "@solana/web3.js";
import { solanaConnection } from "@/rpc";
import { errorHandler, log } from "./handlers";

export async function sendTransaction(account: web3.Keypair, amount: number, to: string) {
  let attempts = 0;

  try {
    attempts += 1;

    const { lamportsPerSignature } = (await solanaConnection.getRecentBlockhash("confirmed"))
      .feeCalculator;

    const toPubkey = new web3.PublicKey(to);

    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: account.publicKey,
        toPubkey,
        lamports: amount - lamportsPerSignature,
      })
    );

    const signature = await web3.sendAndConfirmTransaction(solanaConnection, transaction, [
      account,
    ]);
    return signature;
  } catch (error) {
    log(`No transaction for ${amount} to ${to}`);
    errorHandler(error);

    if (attempts < 1) {
      sendTransaction(account, amount, to);
    }
  }
}
