import { HELIUS_API_KEY } from "./env";

export const BUYS_THRESHOLD = 150;
export const CHECK_INTERVAL = 5 * 60;
export const CLEANUP_INTERVAL = 300;
export const AGE_THRESHOLD = 10;
export const heliusUrl = `https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_API_KEY}`;
