import { Card } from "components/_modules/cards/domain/cardsTypes";

interface CardMiniProps {
  card: {
    card: Card;
    quantity: number;
  };
}
export default function CardMini({ card }: CardMiniProps) {
  return (
    <div className="p-2 bg-white rounded-lg w-full">
      <p className="text-xs text-gray-500">
        {card.quantity} - {card.card.name}
      </p>
    </div>
  );
}
