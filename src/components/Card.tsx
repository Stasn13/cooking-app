import { memo } from "react";
import { CopyIcon } from "../assets/icons/CopyIcon";
import { LayerIcon } from "../assets/icons/LayerIcon";
import { LightningIcon } from "../assets/icons/LightningIcon";
import { PersonIcon } from "../assets/icons/PersonIcon";
import { SnipeIcon } from "../assets/icons/SnipeIcon";
import { TelegramIcon } from "../assets/icons/TelegramIcon";
import { TrophyIcon } from "../assets/icons/TrophyIcon";
import { TwitterIcon } from "../assets/icons/TwitterIcon";
import { WebIcon } from "../assets/icons/WebIcon";

type CardProps = {
  name?: unknown;
  image?: unknown;
  symbol?: unknown;
  mint?: unknown;
  totalSupply?: unknown;
  snipersCount?: unknown;
  diamondHands?: unknown;
  liquidity?: unknown;
  marketCap?: unknown;
  volume?: unknown;
  totalHolders?: unknown;
};

function sanitizeImageUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function sanitizeText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.replace(/\s+/g, " ").trim();

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, 120);
}

function formatMint(value: string) {
  if (value.length <= 8) {
    return value;
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function trimTrailingZeros(value: string) {
  return value.replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");
}

function parseFiniteNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.replace(/,/g, "").trim();

    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function formatCompactMetric(value: unknown) {
  const parsed = parseFiniteNumber(value);

  if (parsed === null) {
    return "--";
  }

  const absolute = Math.abs(parsed);

  if (absolute >= 1_000_000) {
    const compact =
      absolute >= 10_000_000 ? parsed / 1_000_000 : parsed / 1_000_000;
    const digits = absolute >= 10_000_000 ? 0 : 1;

    return `${trimTrailingZeros(compact.toFixed(digits))}M`;
  }

  if (absolute >= 1_000) {
    const digits = absolute >= 100_000 ? 0 : 1;

    return `${trimTrailingZeros((parsed / 1_000).toFixed(digits))}K`;
  }

  if (absolute >= 100) {
    return trimTrailingZeros(parsed.toFixed(0));
  }

  if (absolute >= 10) {
    return trimTrailingZeros(parsed.toFixed(1));
  }

  return trimTrailingZeros(parsed.toFixed(2));
}

export const Card = memo(function Card({
  name,
  image,
  mint,
  snipersCount,
  diamondHands,
  totalHolders,
  liquidity,
  marketCap,
  volume,
}: CardProps) {
  const safeImage = sanitizeImageUrl(image);
  const safeName = sanitizeText(name) ?? "Unknown token";
  const safeMint = formatMint(sanitizeText(mint) ?? "No mint");
  const safeDiamondHands = formatCompactMetric(diamondHands);
  const safeSnipersCount = formatCompactMetric(snipersCount);
  const safeTotalHolders = formatCompactMetric(totalHolders);
  const safeLiquidity = formatCompactMetric(liquidity);
  const safeVolume = formatCompactMetric(volume);
  const safeMarketCap = formatCompactMetric(marketCap);

  return (
    <div className="rounded-[8px] border-[0.5px] border-gray-500 bg-gray-300 p-4">
      <div className="border-b-[0.5px] border-gray-500 pb-3">
        <div className="flex items-center gap-3">
          {safeImage ? (
            <img
              src={safeImage}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover border-b-[0.5px] border-gray-500"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-xs text-zinc-300">
              IMG
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="min-w-0 flex gap-2 items-center">
              <div className="truncate text-sm text-white max-w-[80px]">
                {safeName}
              </div>
              <div className="truncate text-xs text-zinc-400">{safeMint}</div>
              <CopyIcon />
            </div>
            <div className="flex gap-1.5">
              <TwitterIcon />
              <TelegramIcon />
              <WebIcon />
            </div>
          </div>

          <button
            type="button"
            className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-600 bg-gray-400 p-1.75 text-white"
          >
            <LightningIcon />
            <span className="text-[14px] leading-[14px]">$100</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col pt-3 gap-1">
        <div className="flex gap-2">
          <div className="text-brand-primary">
            <TrophyIcon className="mr-1 inline-block" />
            {safeDiamondHands}
          </div>
          <div className="text-brand-secondary">
            <LayerIcon className="mr-1 inline-block" />
            22%
          </div>
          <div className="text-brand-turquoise">
            <SnipeIcon className="mr-1 inline-block" />
            {safeSnipersCount}
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <div className="flex items-center">
              <PersonIcon className="mr-1" />
              {safeTotalHolders}
            </div>
            <div>
              <span className="text-gray-900 mr-1">Liq</span>
              {safeLiquidity}
            </div>
            <div>
              <span className="text-gray-900 mr-1">Vol</span>
              {safeVolume}
            </div>
            <div>
              <span className="text-gray-900 mr-1">Cap</span>
              {safeMarketCap}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
});
