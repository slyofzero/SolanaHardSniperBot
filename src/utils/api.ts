import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

export async function apiFetcher<T>(url: string) {
  const response = await fetch(url);
  const data = (await response.json()) as T;
  return { response: response.status, data };
}

export async function getTokenMetaData(token: string) {
  try {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const metaplex = Metaplex.make(connection);

    const mintAddress = new PublicKey(token);

    const metadataAccount = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: mintAddress });

    const metadataAccountInfo = await connection.getAccountInfo(
      metadataAccount
    );

    if (!metadataAccountInfo) {
      throw Error("Metadata account not found");
    }

    const tokenData = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });

    return tokenData;
  } catch (error) {
    return undefined;
  }
}
