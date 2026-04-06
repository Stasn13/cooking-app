export type ExploreToken = {
  mint: string;
  name: string | null;
  image: string | null;
  symbol: string | null;
  totalSupply: unknown;
  snipersCount: unknown;
  diamondHands: unknown;
  liquidity: unknown;
  marketCap: unknown;
  volume: unknown;
  totalHolders: unknown;
};

export type ExploreListsState = {
  newTokens: ExploreToken[];
  aboutToGraduate: ExploreToken[];
  graduated: ExploreToken[];
};

export type ExploreState = {
  lists: ExploreListsState;
  errorMessage: string | null;
};

export type ExploreStreamConfig = {
  endpoint: string | null | undefined;
  token: string | null | undefined;
};

export type PartialListsState = Partial<ExploreListsState>;

export const EMPTY_LISTS: ExploreListsState = {
  newTokens: [],
  aboutToGraduate: [],
  graduated: [],
};

export const SECTION_LIMIT = 50;
export const RECONNECT_DELAY_MS = 1_500;
