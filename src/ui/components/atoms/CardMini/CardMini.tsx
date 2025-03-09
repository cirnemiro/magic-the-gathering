import { Card } from "components/_modules/cards/domain/cardsTypes";

interface CardMiniProps {
  card: {
    card: Card;
    quantity: number;
  };
  handleRemoveCard: (cardId: string) => void;
}
export default function CardMini({ card, handleRemoveCard }: CardMiniProps) {
  return (
    <div className=" text-xs text-gray-500 p-2 flex justify-between items-center bg-white rounded-lg w-full hover:bg-gray-100">
      <p className="">
        {card.quantity} - {card.card.name}
      </p>
      <p
        className="cursor-pointer"
        onClick={() => handleRemoveCard(card.card.id)}
      >
        X
      </p>
    </div>
  );
}
