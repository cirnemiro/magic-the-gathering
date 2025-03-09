import { z } from "zod";

export const ForeignNameSchema = z.object({
  name: z.string(),
  text: z.string().optional(),
  type: z.string().optional(),
  flavor: z.string().nullable().optional(),
  imageUrl: z.string().url().optional(),
  language: z.string(),
  identifiers: z.object({
    scryfallId: z.string(),
    multiverseId: z.number().optional(),
  }),
  multiverseid: z.number().nullable().optional(),
});

export const LegalitySchema = z.object({
  format: z.string(),
  legality: z.string(),
});

export const CardSchema = z.object({
  name: z.string(),
  manaCost: z.string().optional(),
  cmc: z.number(),
  colors: z.array(z.string()).optional(),
  colorIdentity: z.array(z.string()).optional(),
  type: z.string(),
  types: z.array(z.string()),
  subtypes: z.array(z.string()).optional(),
  rarity: z.string(),
  set: z.string(),
  setName: z.string(),
  text: z.string().optional(),
  flavor: z.string().optional(),
  artist: z.string(),
  number: z.string(),
  power: z.string().optional(),
  toughness: z.string().optional(),
  layout: z.string(),
  multiverseid: z.string().optional(),
  imageUrl: z.string().url().nullable().optional(),
  variations: z.array(z.string()).optional(),
  foreignNames: z.array(ForeignNameSchema).nullable().optional(),
  printings: z.array(z.string()),
  originalText: z.string().optional(),
  originalType: z.string().optional(),
  legalities: z.array(LegalitySchema).optional(),
  id: z.string(),
});

const ResponseSchema = z.object({
  cards: z.array(CardSchema),
});

export { ResponseSchema };
