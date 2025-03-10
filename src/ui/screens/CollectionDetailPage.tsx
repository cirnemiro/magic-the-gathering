"use client";

import { useState } from "react";
import Galery from "../components/organisms/Galery/Galery";
import GaleryFilters from "../components/organisms/GaleryFilters/GaleryFilters";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import { useCollectionManager } from "../hooks/logic/useCollectionManager";
import CollectionForm from "../components/organisms/CollectionForm/CollectionForm";
import useGetCollectionById from "../hooks/api/useGetCollectionById";

interface CreateCollectionPageProps {
  slug: string;
}

export default function CollectionDetailPage({
  slug,
}: CreateCollectionPageProps) {
  const [filters, setFilters] = useState({
    pageSize: "20",
    contains: "imageUrl",
    supertypes: "",
    colors: "",
  });

  const { cards, isLoading } = useGetAllCards(filters);
  const { data: collection } = useGetCollectionById(slug);

  const { selectedCards, addCard, removeCard, getTotalCards, clearDeck } =
    useCollectionManager(collection?.cards);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      Create Your Deck
      <div className="flex gap-4">
        <div className="w-full flex flex-col gap-4">
          <GaleryFilters setFilters={setFilters} filters={filters} />
          <div className="overflow-y-auto p-4 max-h-[75vh]">
            <Galery
              cards={cards?.cards}
              isLoading={isLoading}
              onClick={addCard}
            />
          </div>
        </div>
        <CollectionForm
          handleClearDeck={clearDeck}
          handleRemoveCard={removeCard}
          selectedCards={selectedCards}
          totalCards={getTotalCards()}
          initialCollection={collection}
        />
      </div>
    </div>
  );
}
