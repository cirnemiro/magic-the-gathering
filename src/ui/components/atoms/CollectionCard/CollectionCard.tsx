import { Collection } from "components/_modules/collections/domain/collectionsTypes";

interface CollectionCardProps {
  collection: Collection;
  isSelected?: boolean;
  onClick?: () => void;
}
export default function CollectionCard({
  collection,
  isSelected,
  onClick,
}: CollectionCardProps) {
  return (
    <div
      className={`border className="border p-4  cursor-pointer rounded-lg shadow-md hover:shadow-lg hover:bg-gray-300 transition-all ${
        isSelected ? "bg-gray-300" : "bg-white"
      }`}
      onClick={onClick}
    >
      {collection.name}
    </div>
  );
}
