import { z } from "zod";
import {
  CardSchema,
  ForeignNameSchema,
  LegalitySchema,
  ResponseSchema,
} from "./cardsSchema";

export type ForeignName = z.infer<typeof ForeignNameSchema>;
export type Legality = z.infer<typeof LegalitySchema>;
export type Card = z.infer<typeof CardSchema>;
export type CardsResponse = z.infer<typeof ResponseSchema>;

export const cardColors: {
  [key: string]: { name: string; color: string };
} = {
  W: { name: "White", color: "bg-yellow-100 text-gray-800" },
  U: { name: "Blue", color: "bg-blue-900 text-white" },
  B: { name: "Black", color: "bg-gray-800 text-white" },
  R: { name: "Red", color: "bg-red-900 text-white" },
  G: { name: "Green", color: "bg-green-900 text-white" },
  C: { name: "Colorless", color: "bg-gray-400 text-black" },
};
