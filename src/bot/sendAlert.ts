import { PairData } from "@/types";
import { BUYS_THRESHOLD, excludedTokens } from "@/utils/constants";
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

  for (const pair of pairs) {
    const { baseToken, txns } = pair;
    const { address, name, symbol } = baseToken;
    const { buys } = txns.m5;

    if (buys > BUYS_THRESHOLD && !hardSnipedTokens[address] && !excludedTokens.includes(address)) {
      hardSnipedTokens[address] = Math.floor(Date.now() / 1e3);
      const { marketCap, volume, liquidity, priceUsd, pairAddress, pairCreatedAt } = pair;
      const age = moment(pairCreatedAt).fromNow();

      const tokenLink = `https://solscan.io/token/${address}`;
      const dexScreenerLink = `https://dexscreener.com/solana/${pairAddress}`;
      const dexToolsLink = `https://www.dextools.io/app/en/solana/pair-explorer/${pairAddress}`;

      // Text
      let text = `🎯 Hard Sniped Alert

🪙 ${hardCleanUpBotMessage(name)} [${symbol}](${tokenLink})
💲 Price: $${formatToInternational(parseFloat(priceUsd))}
🌀 Hard Sniped ${buys} times

📈 Volume: $${formatToInternational(volume.m5)}
💰 Mcap: $${formatToInternational(marketCap)}
💧 Liquidity: $${formatToInternational(liquidity.usd)}
⌛ Token Created: ${age}

CA: \`${address}\``;

      text = cleanUpBotMessage(text);

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
        .catch((e) => errorHandler(e));
    }
  }
}
