import web3 from "@solana/web3.js";
import { solanaConnection } from "./rpc/config";
import { REVENUE_SHARE_ACCOUNT, SECRET_KEY } from "./utils/env";
import { log } from "./utils/handlers";
import { holders } from "./vars";
import { sendTransaction } from "./utils/web3";
import { decode } from "bs58";

export async function sendRevenueShare() {
  if (!REVENUE_SHARE_ACCOUNT || !SECRET_KEY) {
    log("REVENUE_SHARE_ACCOUNT or SECRET_KEY is undefined");
    return false;
  }

  const secretKeyArray = decode(SECRET_KEY);
  const account = web3.Keypair.fromSecretKey(secretKeyArray);

  const revenueShareAccount = new web3.PublicKey(REVENUE_SHARE_ACCOUNT);
  const revenueShareBalance = await solanaConnection.getBalance(revenueShareAccount);

  for (const holder in holders) {
    const holding = holders[holder];
    const holderShare = Math.floor((revenueShareBalance * holding) / 100);

    const signature = await sendTransaction(account, holderShare, holder);
    log(`Txn sent ${signature}`);
  }
}
