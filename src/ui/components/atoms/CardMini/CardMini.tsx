import { Card, cardColors } from "components/_modules/cards/domain/cardsTypes";
import ManaCost from "../ManaCost/ManaCost";

interface CardMiniProps {
  card: {
    card: Card;
    quantity: number;
  };
  handleRemoveCard: (cardId: string) => void;
}
export default function CardMini({ card, handleRemoveCard }: CardMiniProps) {
  const cardColor = cardColors[card?.card?.colorIdentity?.[0] ?? "W"].color;
  console.log(card.card.manaCost);

  return (
    <div
      className={`text-xs text-gray-500 p-2 flex justify-between items-center rounded-lg w-full hover:opcacity-100 backdrop-opacity-85 ${cardColor}`}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <p className="text-xs font-bold">{card.quantity}</p>
          <p>{card.card.name}</p>
        </div>
        <div>
          <ManaCost manaCost={card.card.manaCost} />
        </div>
      </div>
      <p
        className="cursor-pointer"
        onClick={() => handleRemoveCard(card.card.id)}
      >
        X
      </p>
    </div>
  );
}
