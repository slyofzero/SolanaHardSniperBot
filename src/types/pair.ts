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
  buyers: TimeFrameStats;
  sellers: TimeFrameStats;
  makers: TimeFrameStats;
  volume: TimeFrameStats;
  volumeBuy: TimeFrameStats;
  volumeSell: TimeFrameStats;
  priceChange: TimeFrameStats;
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
