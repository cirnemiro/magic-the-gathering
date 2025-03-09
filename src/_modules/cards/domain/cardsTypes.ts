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
