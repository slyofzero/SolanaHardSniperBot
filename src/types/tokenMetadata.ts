/* eslint-disable */
interface AccountInfo {
  key: string;
  isSigner: boolean;
  isWritable: boolean;
  lamports: number;
  data: {
    parsed: {
      info: {
        decimals: number;
        freezeAuthority: string;
        isInitialized: boolean;
        mintAuthority: string;
        supply: string;
      };
      type: string;
    };
    program: string;
    space: number;
  };
  owner: string;
  executable: boolean;
  rentEpoch: number;
}

interface OnChainMetadata {
  tokenStandard: string;
  key: string;
  updateAuthority: string;
  mint: string;
  data: {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: any; // You might want to create a specific interface for creators if needed
  };
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  uses: {
    useMethod: string;
    remaining: number;
    total: number;
  };
  collection: any; // You might want to create a specific interface for collection if needed
  collectionDetails: any; // You might want to create a specific interface for collection details if needed
}

interface OffChainMetadata {
  creator: {
    name: string;
    site: string;
  };
  description: string;
  extensions: {
    telegram: string;
    twitter: string;
    website: string;
  };
  image: string;
  name: string;
  symbol: string;
  tags: string[];
}

interface NFTData {
  account: string;
  onChainAccountInfo: {
    accountInfo: AccountInfo;
    error: string;
  };
  onChainMetadata: {
    metadata: OnChainMetadata;
    error: string;
  };
  offChainMetadata: {
    metadata: OffChainMetadata;
    uri: string;
    error: string;
  };
  legacyMetadata: any; // You might want to create a specific interface if needed
}

export interface TokenMetadata {
  account: string;
  onChainAccountInfo: {
    accountInfo?: AccountInfo;
  };
  onChainMetadata: {
    metadata?: OnChainMetadata;
  };
  offChainMetadata: {
    metadata?: OffChainMetadata;
  };
}
