import type { ExploreStreamConfig } from "../types/types";

export function readStreamConfigFromEnv(): Required<ExploreStreamConfig> {
  return {
    endpoint: import.meta.env.VITE_STOVE_URL?.trim() ?? null,
    token: import.meta.env.VITE_STOVE_JWT?.trim() ?? null,
  };
}
