import { Card as CardType } from "components/_modules/cards/domain/cardsTypes";
import Card from "../../atoms/Card/Card";
import GalerySkeleton from "./GalerySkeleton";

interface GaleryProps {
  cards?: CardType[];
  isLoading: boolean;
  onClick?: (card: CardType) => void;
  gridCols?: string;
}

export default function Galery({
  cards,
  isLoading,
  onClick,
  gridCols = "4",
}: GaleryProps) {
  if (isLoading) {
    return <GalerySkeleton gridCols={gridCols} />;
  }
  if (!cards) {
    return <div> No cards </div>;
  }

  return (
    <div className={`w-full grid grid-cols-${gridCols} gap-4 pr-2 `}>
      {cards?.map((card) => (
        <Card key={card.id} card={card} onClick={onClick} />
      ))}
    </div>
  );
}
