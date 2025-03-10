"use client";

import { useState } from "react";
import Galery from "../components/organisms/Galery/Galery";
import GaleryFilters from "../components/organisms/GaleryFilters/GaleryFilters";
import { useSearchParams } from "next/navigation";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import CollectionForm from "../components/organisms/CollectionForm/CollectionForm";
import { useCollectionManager } from "../hooks/logic/useCollectionManager";

export default function CreateCollectionPage() {
  const searchParams = useSearchParams();

  const { selectedCards, addCard, removeCard, getTotalCards, clearDeck } =
    useCollectionManager();

  const [filters, setFilters] = useState({
    pageSize: searchParams.get("pageSize") || "20",
    contains: searchParams.get("contains") || "imageUrl",
    supertypes: searchParams.get("supertypes") || "",
    colors: searchParams.get("colors") || "",
  });

  const { cards, isLoading } = useGetAllCards(filters);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create Your Deck</h1>
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
        />
      </div>
    </div>
  );
}
