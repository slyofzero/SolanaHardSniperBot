import { apiFetcher } from "@/utils/api";
import { TRENDING_TOKENS_API } from "@/utils/env";

export async function getTrendingTokens() {
  const data = await apiFetcher(`${TRENDING_TOKENS_API}/analytics/preview/trending?limit=10`);
  console.log(data);
}
