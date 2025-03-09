import { Card } from "components/_modules/cards/domain/cardsTypes";

export type Collection = {
  id?: string;
  name: string;
  length?: number;
  cards: {
    card: Card;
    quantity: number;
  }[];
};
