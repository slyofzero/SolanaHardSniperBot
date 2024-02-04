interface Token {
  address: string;
  name: string;
  symbol: string;
}

interface TransactionStats {
  buys: number;
  sells: number;
}

interface TimeFrameStats {
  m5: TransactionStats;
  h1: TransactionStats;
  h6: TransactionStats;
  h24: TransactionStats;
}

interface TimeFrameData {
  m5: number;
  h1: number;
  h6: number;
  h24: number;
}

export interface PairData {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: Token;
  quoteToken: Token;
  quoteTokenSymbol: string;
  price: string;
  priceUsd: string;
  txns: TimeFrameStats;
  buyers: TimeFrameData;
  sellers: TimeFrameData;
  makers: TimeFrameData;
  volume: TimeFrameData;
  volumeBuy: TimeFrameData;
  volumeSell: TimeFrameData;
  priceChange: TimeFrameData;
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  marketCap: number;
  pairCreatedAt: number;
  eti: boolean;
  c: string;
  a: string;
}
