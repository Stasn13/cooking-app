type CardProps = {
  name?: unknown
  image?: unknown
  symbol?: unknown
  mint?: unknown
  totalSupply?: unknown
  snipersCount?: unknown
  diamondHands?: unknown
  liquidity?: unknown
  marketCap?: unknown
  volume?: unknown
}

function sanitizeImageUrl(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  try {
    const url = new URL(value)

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null
    }

    return url.toString()
  } catch {
    return null
  }
}

function sanitizeText(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const cleaned = value
    .replace(/\s+/g, ' ')
    .trim()

  if (!cleaned) {
    return null
  }

  return cleaned.slice(0, 120)
}

export const Card = ({ name, image, symbol }: CardProps) => {
  const safeImage = sanitizeImageUrl(image)
  const safeName = sanitizeText(name) ?? 'Unknown token'
  const safeSymbol = sanitizeText(symbol) ?? 'No symbol'

  return (
    <div className="rounded-[8px] border-b-[0.5px] border-gray-500 bg-gray-300 p-4">
      <div className="border-b-[0.5px] border-gray-500 pb-3">
        <div className="flex items-center gap-3">
          {safeImage ? (
            <img
              src={safeImage}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-xs text-zinc-300">
              IMG
            </div>
          )}

          <div className="min-w-0">
            <div className="truncate text-sm text-white">{safeName}</div>
            <div className="truncate text-xs text-zinc-400">{safeSymbol}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
