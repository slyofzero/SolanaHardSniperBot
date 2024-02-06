declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string | undefined;
      BOT_USERNAME: string | undefined;
      WSS_URL: string | undefined;
      CHANNEL_ID: string | undefined;
      HELIUS_API_KEY: string | undefined;
    }
  }
}

export {};
