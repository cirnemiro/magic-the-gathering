"use client";

import { useEffect, useState } from "react";
import Galery from "../components/organisms/Galery/Galery";
import GaleryFilters from "../components/organisms/GaleryFilters/GaleryFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import { Card } from "components/_modules/cards/domain/cardsTypes";
import CardMini from "../components/atoms/CardMini/CardMini";

type SelectedCard = {
  card: Card;
  quantity: number;
};

export default function CreateDeckPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    pageSize: searchParams.get("pageSize") || "20",
    contains: searchParams.get("contains") || "imageUrl",
    supertypes: searchParams.get("supertypes") || "",
  });

  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  const handleAddCard = (newCard: Card) => {
    setSelectedCards((prev) => {
      const existingCardIndex = prev.findIndex(
        (card) => card.card.id === newCard.id
      );

      if (existingCardIndex !== -1) {
        const updatedCards = [...prev];
        updatedCards[existingCardIndex] = {
          ...updatedCards[existingCardIndex],
          quantity: updatedCards[existingCardIndex].quantity + 1,
        };
        return updatedCards;
      } else {
        return [...prev, { card: newCard, quantity: 1 }];
      }
    });
  };

  const handleSaveDeck = () => {
    console.log("save deck");
  };

  const handleClearDeck = () => {
    setSelectedCards([]);
  };

  console.log(selectedCards, "selectedCards");

  const { cards, isLoading } = useGetAllCards(filters);
  return (
    <div className=" w-full p-4 flex flex-col gap-4">
      Create Your Deck
      <div className="flex gap-4 ">
        <div className="w-full flex flex-col gap-4 ">
          <GaleryFilters setFilters={setFilters} filters={filters} />
          <div className="overflow-y-auto p-4 max-h-[75vh] ">
            <Galery
              cards={cards?.cards}
              isLoading={isLoading}
              onClick={handleAddCard}
            />
          </div>
        </div>
        <div className="h-full p-4 bg-amber-950 w-[30%] text-amber-50 flex flex-col gap-4">
          <p>Deck Name</p>
          <div className="flex flex-col gap-2">
            {Object.values(selectedCards).map((selectedCard) => (
              <CardMini key={selectedCard.card.id} card={selectedCard} />
            ))}
          </div>
          <div className="flex justify-center flex-col gap-4">
            <button onClick={handleClearDeck}>Clear deck</button>
            <button onClick={handleSaveDeck}>Save deck</button>
          </div>
        </div>
      </div>
    </div>
  );
}
