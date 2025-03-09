import { Card as CardType } from "components/_modules/cards/domain/cardsTypes";

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  quantity?: number;
}

export default function Card({ card, onClick, quantity }: CardProps) {
  return (
    <div className="relative">
      {quantity ? (
        <div className="z:10 absolute top-0 left-0 bg-white rounded-xs p-2 opacity-95">
          <p>x {quantity} </p>
        </div>
      ) : null}
      <div
        className={`max-w-sm rounded overflow-hidden shadow-lg bg-white ${
          onClick ? " cursor-pointer" : ""
        }`}
        onClick={() => onClick && onClick(card)}
      >
        {card.imageUrl && (
          <img
            className="w-full h-full min-h-[260px] object-cover"
            src={card.imageUrl}
            alt={card.name}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
