import web3 from "@solana/web3.js";
import { solanaConnection } from "./rpc/config";
import { REVENUE_SHARE_ACCOUNT, SECRET_KEY } from "./utils/env";
import { log } from "./utils/handlers";
import { holders } from "./vars";
import { sendTransaction } from "./utils/web3";
import { decode } from "bs58";
import { sleep } from "./utils/time";

export async function sendRevenueShare() {
  if (!REVENUE_SHARE_ACCOUNT || !SECRET_KEY) {
    log("REVENUE_SHARE_ACCOUNT or SECRET_KEY is undefined");
    return false;
  }

  const secretKeyArray = decode(SECRET_KEY);
  const account = web3.Keypair.fromSecretKey(secretKeyArray);

  const revenueShareAccount = new web3.PublicKey(REVENUE_SHARE_ACCOUNT);
  const revenueShareBalance = await solanaConnection.getBalance(revenueShareAccount);

  for (const [index, [holder, holding]] of holders.entries()) {
    let amount = 0;

    if (index === holders.length - 1) {
      await sleep(30000);
      amount = await solanaConnection.getBalance(revenueShareAccount);
    } else {
      amount = Math.floor((revenueShareBalance * holding) / 100);
    }

    const signature = await sendTransaction(account, amount, holder);
    log(`Txn sent ${signature}`);
  }
}
