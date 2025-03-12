"use client";

import { useState } from "react";
import Galery from "../components/organisms/Galery/Galery";
import GaleryFilters from "../components/organisms/GaleryFilters/GaleryFilters";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import { useCollectionManager } from "../hooks/logic/useCollectionManager";
import CollectionForm from "../components/organisms/CollectionForm/CollectionForm";
import useGetCollectionById from "../hooks/api/useGetCollectionById";
import { Button } from "../components/atoms/Inputs";
import useDeleteCollectionById from "../hooks/api/useDeleteCollectionById";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const { cards, isLoading } = useGetAllCards(filters);
  const { data: collection } = useGetCollectionById(slug);
  const { deleteCollection } = useDeleteCollectionById();

  const { selectedCards, addCard, removeCard, getTotalCards, clearDeck } =
    useCollectionManager(collection?.cards);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold">Your Deck - {collection?.name}</h1>
        <Button
          variant="secondary"
          onClick={() => {
            deleteCollection(slug, {
              onSuccess: () => {
                router.push("/collections");
              },
              onError(error) {
                alert("Error deleting deck" + JSON.stringify(error));
              },
            });
          }}
        >
          Delete Deck
        </Button>
      </div>
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
