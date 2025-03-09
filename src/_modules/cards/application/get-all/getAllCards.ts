import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CardRepoistory } from "../../infrastructure/CardRepository";
import { CardsResponse } from "../../domain/cardsTypes";
import { ApiError } from "next/dist/server/api-utils";

export namespace FetchCards {
  export type Response = CardsResponse;
  export type Error = ApiError;
  export type Options = UseQueryOptions<Response, Error>;
  export type Params = {
    pageSize: string;
    contains: string;
    supertypes: string;
  };
}

const createKey = (params: FetchCards.Params) => [
  "stocks",
  JSON.stringify(params),
];

const queryFetcher = (params: FetchCards.Params) => async () => {
  const result = await CardRepoistory.getAllCards(params);
  if ("error" in result) {
    throw result.error;
  }
  return result;
};

export const useGetAllCards = (
  params: FetchCards.Params,
  options?: FetchCards.Options
) => {
  const { data, ...rest } = useQuery<FetchCards.Response, FetchCards.Error>({
    queryKey: createKey(params),
    queryFn: queryFetcher(params),
    ...options,
  });
  return { cards: data, ...rest };
};
