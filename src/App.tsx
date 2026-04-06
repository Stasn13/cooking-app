import { Card } from "./components/Card";
import { InfoIcon } from "./assets/icons/InfoIcon";
import { useExploreStore } from "./hooks/useExploreStore";

function App() {
  const { lists, errorMessage, isStreamReady } = useExploreStore();

  const sections = [
    { title: "New Tokens", items: lists.newTokens, color: "text-brand-primary" },
    {
      title: "About To Graduate",
      items: lists.aboutToGraduate,
      color: "text-brand-secondary",
    },
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
                  {section.items.map((item) => (
                    <Card
                      key={`${section.title}-${item.mint}`}
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
