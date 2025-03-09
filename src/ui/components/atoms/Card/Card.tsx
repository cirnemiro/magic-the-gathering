import { Card as CardType } from "components/_modules/cards/domain/cardsTypes";

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
}

export default function Card({ card, onClick }: CardProps) {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer"
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
  );
}
