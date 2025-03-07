import { z } from "zod";

const ForeignNameSchema = z.object({
  name: z.string(),
  text: z.string(),
  type: z.string(),
  flavor: z.string().nullable().optional(),
  imageUrl: z.string().url(),
  language: z.string(),
  identifiers: z.object({
    scryfallId: z.string(),
    multiverseId: z.number(),
  }),
  multiverseid: z.number(),
});

const LegalitySchema = z.object({
  format: z.string(),
  legality: z.string(),
});

const CardSchema = z.object({
  name: z.string(),
  manaCost: z.string(),
  cmc: z.number(),
  colors: z.array(z.string()),
  colorIdentity: z.array(z.string()),
  type: z.string(),
  types: z.array(z.string()),
  subtypes: z.array(z.string()).optional(),
  rarity: z.string(),
  set: z.string(),
  setName: z.string(),
  text: z.string(),
  flavor: z.string().optional(),
  artist: z.string(),
  number: z.string(),
  power: z.string().optional(),
  toughness: z.string().optional(),
  layout: z.string(),
  multiverseid: z.string().optional(),
  imageUrl: z.string().url().optional(),
  variations: z.array(z.string()).optional(),
  foreignNames: z.array(ForeignNameSchema).optional(),
  printings: z.array(z.string()),
  originalText: z.string().optional(),
  originalType: z.string().optional(),
  legalities: z.array(LegalitySchema),
  id: z.string(),
});

const ResponseSchema = z.object({
  cards: z.array(CardSchema),
});

export { ResponseSchema };
