import { PairData } from "@/types";
import { AGE_THRESHOLD, BUYS_THRESHOLD } from "@/utils/constants";
import { formatToInternational } from "@/utils/general";
import { hardSnipedTokens } from "@/vars/tokens";
import { teleBot } from "..";
import { cleanUpBotMessage, hardCleanUpBotMessage } from "@/utils/bot";
import { CHANNEL_ID } from "@/utils/env";
import { InlineKeyboard } from "grammy";
import { errorHandler, log } from "@/utils/handlers";
import moment from "moment";

export async function sendAlert(pairs: PairData[]) {
  if (!CHANNEL_ID) {
    log("CHANNEL_ID is undefined");
    process.exit(1);
  }

  pairChecker: for (const pair of pairs) {
    const { baseToken, txns } = pair;
    const { address, name, symbol } = baseToken;
    const { buys } = txns.m5;

    if (buys > BUYS_THRESHOLD && !hardSnipedTokens[address]) {
      const { marketCap, volume, liquidity, priceUsd, pairAddress, pairCreatedAt } = pair;
      const age = moment(pairCreatedAt).fromNow();

      if (!age.includes("minutes")) continue pairChecker;
      const ageMinutes = Number(age.replace("minutes ago", ""));
      if (ageMinutes > AGE_THRESHOLD) continue pairChecker;

      hardSnipedTokens[address] = Math.floor(Date.now() / 1e3);

      const tokenLink = `https://solscan.io/token/${address}`;
      const dexScreenerLink = `https://dexscreener.com/solana/${pairAddress}`;
      const dexToolsLink = `https://www.dextools.io/app/en/solana/pair-explorer/${pairAddress}`;

      const text = `🎯 Hard Sniped Alert

🪙 ${hardCleanUpBotMessage(name)} [${hardCleanUpBotMessage(symbol)}](${tokenLink})
💲 Price: $${cleanUpBotMessage(formatToInternational(parseFloat(priceUsd)))}
🌀 Hard Sniped ${buys} times

📈 Volume: $${cleanUpBotMessage(formatToInternational(volume.m5))}
💰 Mcap: $${cleanUpBotMessage(formatToInternational(marketCap))}
💧 Liquidity: $${cleanUpBotMessage(formatToInternational(liquidity.usd))}
⌛ Token Created: ${age}

CA: \`${address}\``;

      // Inline Keyboard
      const keyboard = new InlineKeyboard()
        .url("🦅 DexScreener", dexScreenerLink)
        .url("⚙️ DexTools", dexToolsLink);

      teleBot.api
        .sendMessage(CHANNEL_ID, text, {
          parse_mode: "MarkdownV2",
          reply_markup: keyboard,
          // @ts-expect-error Param not found
          disable_web_page_preview: true,
        })
        .then(() => log(`Sent message for ${address}`))
        .catch((e) => {
          log(text);
          errorHandler(e);
        });
    }
  }
}
