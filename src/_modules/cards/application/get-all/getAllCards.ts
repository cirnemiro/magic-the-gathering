import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CardsResponse } from "../../domain/cardsTypes";
import { ApiError } from "next/dist/server/api-utils";
import { CardRepository } from "../../infrastructure/CardRepository";

export type FetchCardsResponse = CardsResponse;
export type FetchCardsError = ApiError;
export type FetchCardsOptions = UseQueryOptions<
  FetchCardsResponse,
  FetchCardsError
>;
export type FetchCardsParams = {
  pageSize: string;
  contains: string;
  supertypes: string;
};

const createKey = (params: FetchCardsParams) => [
  "stocks",
  JSON.stringify(params),
];

const queryFetcher = async (params: FetchCardsParams) => {
  const result = await CardRepository.getAllCards(params);
  if ("error" in result) {
    throw result.error;
  }
  return result;
};

export const useGetAllCards = (
  params: FetchCardsParams,
  options?: FetchCardsOptions
) => {
  const { data, ...rest } = useQuery<FetchCardsResponse, FetchCardsError>({
    queryKey: createKey(params),
    queryFn: () => queryFetcher(params),
    ...options,
  });
  return { cards: data, ...rest };
};
