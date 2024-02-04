import { PairData } from "@/types";
import { BUYS_THRESHOLD } from "@/utils/constants";
import { hardSnipedTokens } from "@/vars/tokens";

export async function sendAlert(pairs: PairData[]) {
  for (const pair of pairs) {
    const { baseToken, txns } = pair;
    const { address, name } = baseToken;
    const { buys } = txns.m5;

    if (buys > BUYS_THRESHOLD && !hardSnipedTokens[address]) {
      hardSnipedTokens[address] = Math.floor(Date.now() / 1e3);
      console.log(name, buys);
    }
  }
}
