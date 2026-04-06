import { cancelFrame, scheduleFrame } from "../utils/frame";
import { FALLBACK_LISTS, readListsFromPayload } from "../utils/normalize";
import { reconcileLists } from "../utils/reconcile";
import { parseSseBlock, tryParseJson } from "./sse";
import {
  RECONNECT_DELAY_MS,
  type ExploreState,
  type ExploreStreamConfig,
  type PartialListsState,
} from "../types/types";

type StoreSubscriber = () => void;

export function createExploreStore() {
  let state: ExploreState = {
    lists: FALLBACK_LISTS,
    errorMessage: null,
  };

  let controller: AbortController | null = null;
  let reconnectTimer: number | null = null;
  let frameId: number | null = null;
  let pendingLists: PartialListsState | null = null;
  let currentConfig: Required<ExploreStreamConfig> | null = null;
  let hasLiveSnapshot = false;

  const subscribers = new Set<StoreSubscriber>();

  function emit(nextState: ExploreState) {
    state = nextState;

    for (const subscriber of subscribers) {
      subscriber();
    }
  }

  function clearConnection() {
    controller?.abort();
    controller = null;

    if (reconnectTimer !== null) {
      globalThis.clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }

    if (frameId !== null) {
      cancelFrame(frameId);
      frameId = null;
    }

    pendingLists = null;
  }

  function flushPendingLists() {
    if (!pendingLists) {
      return;
    }

    const nextLists = reconcileLists(state.lists, pendingLists);
    pendingLists = null;

    emit({
      lists: nextLists,
      errorMessage: null,
    });
  }

  function scheduleFlush() {
    if (frameId !== null) {
      return;
    }

    frameId = scheduleFrame(() => {
      frameId = null;
      flushPendingLists();
    });
  }

  function consumeEvent(chunk: string) {
    const parsedEvent = parseSseBlock(chunk);

    if (!parsedEvent || parsedEvent.event === "error") {
      return;
    }

    const parsedJson = tryParseJson(parsedEvent.payload);
    const nextLists = readListsFromPayload(parsedJson);

    if (!nextLists) {
      return;
    }

    hasLiveSnapshot = true;
    pendingLists = nextLists;
    scheduleFlush();
  }

  function handleConnectionFailure(message: string) {
    if (!currentConfig?.endpoint || !currentConfig.token) {
      return;
    }

    if (!hasLiveSnapshot) {
      emit({
        lists: FALLBACK_LISTS,
        errorMessage: message,
      });
    } else {
      emit({
        ...state,
        errorMessage: message,
      });
    }

    clearConnection();

    reconnectTimer = globalThis.setTimeout(() => {
      reconnectTimer = null;
      openConnection();
    }, RECONNECT_DELAY_MS);
  }

  async function readStream(
    requestUrl: string,
    token: string,
    signalController: AbortController,
  ) {
    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
        },
        signal: signalController.signal,
      });

      if (!response.ok || !response.body) {
        handleConnectionFailure("Unable to open the live stream.");
        return;
      }

      emit({
        ...state,
        errorMessage: null,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split(/\r?\n\r?\n/);
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          consumeEvent(chunk);
        }
      }

      buffer += decoder.decode();

      if (buffer.trim()) {
        consumeEvent(buffer);
      }

      if (!signalController.signal.aborted) {
        handleConnectionFailure("The live stream closed. Reconnecting...");
      }
    } catch {
      if (signalController.signal.aborted) {
        return;
      }

      handleConnectionFailure("The live stream disconnected. Reconnecting...");
    }
  }

  function openConnection() {
    if (!currentConfig?.endpoint || !currentConfig.token) {
      return;
    }

    const nextController = new AbortController();
    controller = nextController;

    void readStream(
      `${currentConfig.endpoint}?chain=solana`,
      currentConfig.token,
      nextController,
    );
  }

  return {
    subscribe(listener: StoreSubscriber) {
      subscribers.add(listener);

      return () => {
        subscribers.delete(listener);
      };
    },
    getSnapshot() {
      return state;
    },
    connect(config: ExploreStreamConfig) {
      const nextConfig = {
        endpoint: config.endpoint?.trim() ?? null,
        token: config.token?.trim() ?? null,
      };

      if (
        currentConfig?.endpoint === nextConfig.endpoint &&
        currentConfig?.token === nextConfig.token
      ) {
        return;
      }

      currentConfig = nextConfig;
      hasLiveSnapshot = false;
      clearConnection();

      if (!nextConfig.endpoint || !nextConfig.token) {
        emit({
          lists: FALLBACK_LISTS,
          errorMessage: null,
        });
        return;
      }

      openConnection();
    },
    disconnect() {
      currentConfig = null;
      clearConnection();
    },
  };
}
