import { ApiClient } from "components/infrastructure/api/ApiClient";
import { ResponseSchema } from "../domain/cardsSchema";
import {
  FetchCardsParams,
  FetchCardsResponse,
} from "../application/get-all/getAllCards";

export const CardRepository = {
  getAllCards(params: FetchCardsParams) {
    return ApiClient.get<FetchCardsResponse>(
      "/cards",
      { params },
      ResponseSchema
    );
  },
};
