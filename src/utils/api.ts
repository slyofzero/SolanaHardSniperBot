import { TokenMetadata } from "@/types";
import { heliusUrl } from "./constants";

export async function apiFetcher<T>(url: string) {
  const response = await fetch(url);
  const data = (await response.json()) as T;
  return { response: response.status, data };
}

export async function getTokenMetaData(token: string) {
  const response = await fetch(heliusUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mintAccounts: [token],
      includeOffChain: true,
      disableCache: false,
    }),
  });

  const data = (await response.json()) as TokenMetadata[];
  return data.at(0);
}
