import { CLEANUP_INTERVAL } from "@/utils/constants";
import { log } from "@/utils/handlers";
import { hardSnipedTokens } from "@/vars/tokens";

export function cleanUpSnipeTokens() {
  const now = Math.floor(Date.now() / 1e3);
  const tokensToRemove = [];
  log("Cleanup initiated");

  for (const token in hardSnipedTokens) {
    const startTime = hardSnipedTokens[token];
    const timeDiff = now - startTime;

    if (timeDiff > CLEANUP_INTERVAL) {
      tokensToRemove.push(token);
    }
  }

  for (const token of tokensToRemove) {
    delete hardSnipedTokens[token];
    log(`Removed ${token}`);
  }
}
