import { Bot } from "grammy";
import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import { log } from "./utils/handlers";
import { BOT_TOKEN, WSS_URL } from "./utils/env";
import WebSocket from "ws";
import { PairData } from "./types";
import { sendAlert } from "./bot/sendAlert";
import { cleanUpSnipeTokens } from "./bot/cleanUpSnipeTokens";
import { CLEANUP_INTERVAL } from "./utils/constants";

if (!BOT_TOKEN || !WSS_URL) {
  log("BOT_TOKEN or WSS_URL is missing");
  process.exit(1);
}

export const teleBot = new Bot(BOT_TOKEN);
log("Bot instance ready");

const headers = {
  Pragma: "no-cache",
  "Cache-Control": "no-cache",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
  Upgrade: "websocket",
  Origin: "https://dexscreener.com",
  "Sec-WebSocket-Version": "13",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9",
  "Sec-WebSocket-Key": "oEhi9FPY7B8xeU+7/6jGyw==",
  "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
};

(async function () {
  teleBot.start();
  log("Telegram bot setup");
  initiateBotCommands();
  initiateCallbackQueries();

  const ws = new WebSocket(WSS_URL, { headers });

  function connectWebSocket() {
    ws.on("open", function open() {
      log("connected");
    });

    ws.on("close", function close() {
      log("disconnected");
      process.exit(1);
    });

    ws.on("message", function incoming(event: Buffer) {
      const str = event.toString();
      const data = JSON.parse(str) as { pairs: PairData[] };

      const { pairs } = data;

      if (pairs) sendAlert(pairs);
    });

    setInterval(cleanUpSnipeTokens, CLEANUP_INTERVAL * 1e3);
  }

  connectWebSocket();
})();
