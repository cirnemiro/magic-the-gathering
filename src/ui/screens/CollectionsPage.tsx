"use client";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import useGetAllCollections from "../hooks/api/useGetAllCollections";
import { useEffect, useState } from "react";
import Card from "../components/atoms/Card/Card";
import { Button } from "../components/atoms/Inputs";
import { useRouter, useSearchParams } from "next/navigation";
import CollectionCard from "../components/atoms/CollectionCard/CollectionCard";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Your Collections</h1>
      <div className="flex gap-4">
        {data?.map((collection) => (
          <CollectionCard
            collection={collection}
            key={collection.id}
            isSelected={selectedCollection?.id === collection.id}
            onClick={() => setSelectedCollection(collection)}
          />
        ))}
      </div>
      {selectedCollection ? (
        <div>
          <div>
            <Button
              onClick={() =>
                router.push(`/collection/${selectedCollection.id}`)
              }
            >
              Edit Deck
            </Button>
          </div>
          {selectedCollection.name}
          {
            <div className="grid grid-cols-4 gap-4">
              {selectedCollection.cards.map((card) => (
                <Card
                  key={card.card.id}
                  card={card.card}
                  quantity={card.quantity}
                />
              ))}
            </div>
          }
        </div>
      ) : null}
    </div>
  );
}
