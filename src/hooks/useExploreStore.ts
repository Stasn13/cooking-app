import { useEffect, useSyncExternalStore } from "react";
import { readStreamConfigFromEnv } from "../explore/config";
import { createExploreStore } from "../explore/store";

const exploreStore = createExploreStore();

export function useExploreStore() {
  const { endpoint, token } = readStreamConfigFromEnv();
  const isStreamReady = Boolean(endpoint && token);
  const snapshot = useSyncExternalStore(
    exploreStore.subscribe,
    exploreStore.getSnapshot,
    exploreStore.getSnapshot,
  );

  useEffect(() => {
    exploreStore.connect({
      endpoint,
      token,
    });

    return () => {
      exploreStore.disconnect();
    };
  }, [endpoint, token]);

  return {
    ...snapshot,
    isStreamReady,
  };
}
