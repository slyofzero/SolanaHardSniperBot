import { Bot } from "grammy";
import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import { log, stopScript } from "./utils/handlers";
import { BOT_TOKEN } from "./utils/env";
import { getTrendingTokens } from "./bot/getTrendingTokens";

if (!BOT_TOKEN) {
  stopScript("BOT_TOKEN is missing.");
}
export const teleBot = new Bot(BOT_TOKEN || "");
log("Bot instance ready");

(async function () {
  teleBot.start();
  log("Telegram bot setup");
  initiateBotCommands();
  initiateCallbackQueries();

  async function toRepeat() {
    await getTrendingTokens();
  }
  await toRepeat();
})();
