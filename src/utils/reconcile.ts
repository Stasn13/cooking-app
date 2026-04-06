import type {
  ExploreListsState,
  ExploreToken,
  PartialListsState,
} from "../types/types";

/**
 * Compares two lists of tokens and returns a new list where unchanged tokens are the same object references.
 * This helps to prevent unnecessary re-renders in React components that depend on these lists.
 *
 * @param current - The current list of tokens.
 * @param next - The new list of tokens to compare against the current list.
 * @returns A reconciled list of tokens where unchanged tokens maintain their original references.
 */

function isSameToken(left: ExploreToken, right: ExploreToken) {
  return (
    left.mint === right.mint &&
    left.name === right.name &&
    left.image === right.image &&
    left.symbol === right.symbol &&
    left.totalSupply === right.totalSupply &&
    left.snipersCount === right.snipersCount &&
    left.diamondHands === right.diamondHands &&
    left.liquidity === right.liquidity &&
    left.marketCap === right.marketCap &&
    left.volume === right.volume &&
    left.totalHolders === right.totalHolders
  );
}

function reconcileSection(current: ExploreToken[], next: ExploreToken[]) {
  const currentByMint = new Map(current.map((token) => [token.mint, token]));

  return next.map((token) => {
    const previous = currentByMint.get(token.mint);
    return previous && isSameToken(previous, token) ? previous : token;
  });
}

export function reconcileLists(
  current: ExploreListsState,
  next: PartialListsState,
) {
  return {
    newTokens: next.newTokens
      ? reconcileSection(current.newTokens, next.newTokens)
      : current.newTokens,
    aboutToGraduate: next.aboutToGraduate
      ? reconcileSection(current.aboutToGraduate, next.aboutToGraduate)
      : current.aboutToGraduate,
    graduated: next.graduated
      ? reconcileSection(current.graduated, next.graduated)
      : current.graduated,
  } satisfies ExploreListsState;
}
