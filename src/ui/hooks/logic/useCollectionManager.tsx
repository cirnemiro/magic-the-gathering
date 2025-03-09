import { useEffect, useState } from "react";
import { Card } from "components/_modules/cards/domain/cardsTypes";

export type SelectedCard = {
  card: Card;
  quantity: number;
};

export const useCollectionManager = (initialCards?: SelectedCard[]) => {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  useEffect(() => {
    if (initialCards) {
      setSelectedCards(initialCards);
    }
  }, [initialCards]);

  const getTotalCards = () =>
    selectedCards.reduce((acc, card) => acc + card.quantity, 0);

  const addCard = (newCard: Card) => {
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

  const removeCard = (cardId: string) => {
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
      }
      return prev;
    });
  };

  const clearDeck = () => {
    setSelectedCards([]);
  };

  return {
    selectedCards,
    addCard,
    removeCard,
    getTotalCards,
    setSelectedCards,
    clearDeck,
  };
};
