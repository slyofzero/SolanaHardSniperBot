declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RPC_ENDPOINT: string | undefined;
      TOKEN_URL: string | undefined;
      REVENUE_SHARE_ACCOUNT: string | undefined;
      SECRET_KEY: string | undefined;
    }
  }
}

export {};
