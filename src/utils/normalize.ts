import { stoveStubPayload } from "../mocks/stoveStub";
import {
  EMPTY_LISTS,
  SECTION_LIMIT,
  type ExploreListsState,
  type ExploreToken,
  type PartialListsState,
} from "../types/types";

function sanitizeShortText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.replace(/\s+/g, " ").trim();

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, 160);
}

function normalizeToken(item: unknown) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return null;
  }

  const source = item as Record<string, unknown>;
  const mint = sanitizeShortText(source.mint);

  if (!mint) {
    return null;
  }

  return {
    mint,
    name: sanitizeShortText(source.name),
    image: sanitizeShortText(source.image),
    symbol: sanitizeShortText(source.symbol),
    totalSupply: source.totalSupply,
    snipersCount: source.snipersCount,
    diamondHands: source.diamondHands,
    liquidity: source.liquidity,
    marketCap: source.marketCap,
    volume: source.volume,
    totalHolders: source.totalHolders,
  } satisfies ExploreToken;
}

function extractTokens(source: unknown) {
  if (!Array.isArray(source)) {
    return [];
  }

  const safeTokens: ExploreToken[] = [];
  const seenMints = new Set<string>();

  for (const item of source) {
    const normalized = normalizeToken(item);

    if (!normalized || seenMints.has(normalized.mint)) {
      continue;
    }

    safeTokens.push(normalized);
    seenMints.add(normalized.mint);

    if (safeTokens.length >= SECTION_LIMIT) {
      break;
    }
  }

  return safeTokens;
}

export function readListsFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const nextLists: PartialListsState = {};
  const source = payload as Record<string, unknown>;

  if ("newPairs" in source) {
    nextLists.newTokens = extractTokens(source.newPairs);
  }

  if ("aboutToMigrate" in source) {
    nextLists.aboutToGraduate = extractTokens(source.aboutToMigrate);
  }

  if ("migrated" in source) {
    nextLists.graduated = extractTokens(source.migrated);
  }

  return nextLists;
}

export const FALLBACK_LISTS: ExploreListsState = (() => {
  const lists = readListsFromPayload(stoveStubPayload);

  if (!lists) {
    return EMPTY_LISTS;
  }

  return {
    newTokens: lists.newTokens ?? [],
    aboutToGraduate: lists.aboutToGraduate ?? [],
    graduated: lists.graduated ?? [],
  };
})();
