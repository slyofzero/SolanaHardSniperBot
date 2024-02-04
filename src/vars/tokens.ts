import { HardSnipedTokens } from "@/types";

export let hardSnipedTokens: HardSnipedTokens = {};

export function setHardSnipedTokens(newHardSnipedTokens: HardSnipedTokens) {
  hardSnipedTokens = newHardSnipedTokens;
}
