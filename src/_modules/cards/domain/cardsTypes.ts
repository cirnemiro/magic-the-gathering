// src/cards/domain/cardTypes.ts

export interface ForeignName {
  name: string;
  text: string;
  type: string;
  flavor?: string | null;
  imageUrl: string;
  language: string;
  identifiers: {
    scryfallId: string;
    multiverseId: number;
  };
  multiverseid: number;
}

export interface Legality {
  format: string;
  legality: string;
}

export interface Card {
  name: string;
  manaCost: string;
  cmc: number;
  colors: string[];
  colorIdentity: string[];
  type: string;
  types: string[];
  subtypes?: string[];
  rarity: string;
  set: string;
  setName: string;
  text: string;
  flavor?: string;
  artist: string;
  number: string;
  power?: string;
  toughness?: string;
  layout: string;
  multiverseid?: string;
  imageUrl?: string;
  variations?: string[];
  foreignNames?: ForeignName[];
  printings: string[];
  originalText?: string;
  originalType?: string;
  legalities: Legality[];
  id: string;
}

export interface CardsResponse {
  cards: Card[];
}
