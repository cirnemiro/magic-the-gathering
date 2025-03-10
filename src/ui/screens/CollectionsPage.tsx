"use client";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import useGetAllCollections from "../hooks/api/useGetAllCollections";
import { useEffect, useState } from "react";
import Card from "../components/atoms/Card/Card";
import { Button } from "../components/atoms/Inputs";
import { useRouter, useSearchParams } from "next/navigation";
import CollectionCard from "../components/atoms/CollectionCard/CollectionCard";
import { divide } from "lodash";

export default function CollectionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("id");

  const { data } = useGetAllCollections();
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  useEffect(() => {
    if (collectionId && data) {
      const selected = data.find(
        (collection) => collection.id === collectionId
      );
      if (selected) {
        setSelectedCollection(selected);
      }
    }
  }, [collectionId, data]);

  return (
    <div className="container flex flex-col h-screen p-4 gap-4">
      <div className="flex flex-1 gap-4">
        <div className="w-[20%] flex flex-col gap-4 h-full">
          <h1 className="text-2xl font-bold">Your Collections</h1>
          <div className="flex flex-col gap-4 w-full overflow-auto pr-2 max-h-[80vh]">
            {data?.map((collection) => (
              <CollectionCard
                collection={collection}
                key={collection.id}
                isSelected={selectedCollection?.id === collection.id}
                onClick={() => setSelectedCollection(collection)}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col flex-grow  h-full flex-1">
          {selectedCollection ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <p className="text-2xl font-bold">{selectedCollection.name}</p>
                <Button
                  onClick={() =>
                    router.push(`/collection/${selectedCollection.id}`)
                  }
                >
                  Edit Deck
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-2 overflow-auto max-h-[80vh] pr-2">
                {selectedCollection.cards.map((card) => (
                  <Card
                    key={card.card.id}
                    card={card.card}
                    quantity={card.quantity}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-auto h-[80vh] flex items-center justify-center text-center">
              <p className="text-gray-500">
                Your collections will be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
