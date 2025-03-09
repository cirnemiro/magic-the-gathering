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
      className={`border p-4 my-4 cursor-pointer ${
        isSelected ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      {collection.name}
    </div>
  );
}
