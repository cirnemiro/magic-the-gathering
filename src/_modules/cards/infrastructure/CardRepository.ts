import { ApiClient } from "components/infrastructure/api/ApiClient";
import { ResponseSchema } from "../domain/cardsSchema";
import { FetchCards } from "../application/get-all/getAllCards";

export const CardRepoistory = {
  getAllCards(params: FetchCards.Params) {
    return ApiClient.get<FetchCards.Response>(
      "/cards",
      { params },
      ResponseSchema
    );
  },
};
