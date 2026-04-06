import { startTransition, useEffect, useState } from "react";
import { Card } from "./components/Card";
import { stoveStubPayload } from "./mocks/stoveStub";
import { InfoIcon } from "./assets/icons/InfoIcon";

type TokenItem = Record<string, unknown>;

type ListsState = {
  newTokens: TokenItem[];
  aboutToGraduate: TokenItem[];
  graduated: TokenItem[];
};

const EMPTY_LISTS: ListsState = {
  newTokens: [],
  aboutToGraduate: [],
  graduated: [],
};

function parseSseBlock(block: string) {
  const lines = block.split(/\r?\n/);
  let event = "message";
  let streamId: string | null = null;
  const data: string[] = [];

  for (const line of lines) {
    if (!line || line.startsWith(":")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    const field = separatorIndex === -1 ? line : line.slice(0, separatorIndex);
    let value = separatorIndex === -1 ? "" : line.slice(separatorIndex + 1);

    if (value.startsWith(" ")) {
      value = value.slice(1);
    }

    if (field === "event") {
      event = value || "message";
    }

    if (field === "id") {
      streamId = value || null;
    }

    if (field === "data") {
      data.push(value);
    }
  }

  if (data.length === 0) {
    return null;
  }

  return {
    event,
    streamId,
    payload: data.join("\n"),
  };
}

function tryParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractTokens(source: unknown) {
  if (!Array.isArray(source)) {
    return [];
  }

  const safeTokens: TokenItem[] = [];

  for (const item of source) {
    if (!item || typeof item !== "object") {
      continue;
    }

    safeTokens.push(item as Record<string, unknown>);
  }

  return safeTokens.slice(0, 50);
}

function readListsFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const nextLists: Partial<ListsState> = {};
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

const FALLBACK_LISTS = (() => {
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

function App() {
  const endpoint = import.meta.env.VITE_STOVE_URL?.trim();
  const token = import.meta.env.VITE_STOVE_JWT?.trim() ?? "";
  const requestUrl = endpoint ? `${endpoint}?chain=solana` : null;
  const isStreamReady = Boolean(requestUrl && token);

  const [lists, setLists] = useState<ListsState>(FALLBACK_LISTS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isStreamReady || !requestUrl) {
      startTransition(() => {
        setLists(FALLBACK_LISTS);
      });

      return;
    }

    const controller = new AbortController();

    const connect = async () => {
      setErrorMessage(null);

      try {
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
          },
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          setErrorMessage(null);
          startTransition(() => {
            setLists(FALLBACK_LISTS);
          });
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const consumeEvent = (chunk: string) => {
          const parsedEvent = parseSseBlock(chunk);

          if (!parsedEvent) {
            return;
          }

          if (parsedEvent.event === "error") {
            setErrorMessage(null);
            startTransition(() => {
              setLists(FALLBACK_LISTS);
            });
            return;
          }

          const parsedJson = tryParseJson(parsedEvent.payload);
          const nextLists = readListsFromPayload(parsedJson);

          if (!nextLists) {
            return;
          }

          startTransition(() => {
            setLists((currentLists) => ({
              newTokens: nextLists.newTokens ?? currentLists.newTokens,
              aboutToGraduate:
                nextLists.aboutToGraduate ?? currentLists.aboutToGraduate,
              graduated: nextLists.graduated ?? currentLists.graduated,
            }));
          });
        };

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
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setErrorMessage(null);
        startTransition(() => {
          setLists(FALLBACK_LISTS);
        });
      }
    };

    void connect();

    return () => {
      controller.abort();
    };
  }, [isStreamReady, requestUrl, token]);

  const sections = [
    { title: "New Tokens", items: lists.newTokens, color: "text-brand-primary" },
    { title: "About To Graduate", items: lists.aboutToGraduate, color: "text-brand-secondary" },
    { title: "Graduated", items: lists.graduated, color: "text-brand-turquoise" },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <div className="mx-auto max-w-8xl">
        {isStreamReady && errorMessage ? (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        ) : null}

        <section className="grid grid-cols-1 gap-2 xl:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="flex h-[calc(100vh-4rem)] min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black px-2 py-4.5 pr-0 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <header className="sticky top-0 z-10 mb-4 flex items-center gap-1.5 pb-2">
                <h2 className={`text-2xl font-semibold ${section.color}`}>{section.title}</h2>
                <InfoIcon />
              </header>

              {section.items.length > 0 ? (
                <ul className="list-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                  {section.items.map((item, index) => (
                    <Card
                      key={`${section.title}-${index}-${String(item.name ?? "token")}`}
                      name={item.name}
                      image={item.image}
                      symbol={item.symbol}
                      mint={item.mint}
                      totalSupply={item.totalSupply}
                      snipersCount={item.snipersCount}
                      diamondHands={item.diamondHands}
                      liquidity={item.liquidity}
                      marketCap={item.marketCap}
                      volume={item.volume}
                      totalHolders={item.totalHolders}
                    />
                  ))}
                </ul>
              ) : (
                <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-gray-400 px-4 py-6 text-sm text-zinc-500">
                  No names received yet.
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
