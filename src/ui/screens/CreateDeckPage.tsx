"use client";

import { useState } from "react";
import Galery from "../components/organisms/Galery/Galery";
import GaleryFilters from "../components/organisms/GaleryFilters/GaleryFilters";
import { useSearchParams } from "next/navigation";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import { Card } from "components/_modules/cards/domain/cardsTypes";
import DeckForm from "../components/organisms/DeckForm/DeckForm";

export type SelectedCard = {
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

  const { cards, isLoading } = useGetAllCards(filters);

  const getTotalCards = () => {
    return selectedCards.reduce((acc, card) => acc + card.quantity, 0);
  };

  const handleAddCard = (newCard: Card) => {
    if (getTotalCards() >= 40) {
      return;
    }
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

  const handleRemoveCard = (cardId: string) => {
    setSelectedCards((prev) => {
      const existingCardIndex = prev.findIndex(
        (card) => card.card.id === cardId
      );

      if (existingCardIndex !== -1) {
        const updatedCards = [...prev];
        updatedCards[existingCardIndex] = {
          ...updatedCards[existingCardIndex],
          quantity: updatedCards[existingCardIndex].quantity - 1,
        };
        if (updatedCards[existingCardIndex].quantity <= 0) {
          updatedCards.splice(existingCardIndex, 1);
        }
        return updatedCards;
      } else {
        return prev;
      }
    });
  };

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
        <DeckForm
          handleRemoveCard={handleRemoveCard}
          selectedCards={selectedCards}
          totalCards={getTotalCards()}
          setSelectedCards={setSelectedCards}
        />
      </div>
    </div>
  );
}
