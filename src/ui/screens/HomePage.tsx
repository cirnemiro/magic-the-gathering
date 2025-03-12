"use client";
import { useRouter } from "next/navigation";
import useGetAllCollections from "../hooks/api/useGetAllCollections";
import CollectionCard from "../components/atoms/CollectionCard/CollectionCard";

export default function HomePage() {
  const router = useRouter();
  const { data } = useGetAllCollections();

  return (
    <div className="p-6 space-y-8">
      <section className="text-center bg-slate-700 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">
          Welcome to Magic: The Gathering
        </h1>
        <p className="text-lg">
          Manage your card collections, explore new cards, and create your
          ultimate deck!
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Collections</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <div
            className="border p-4 my-4 cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-300 transition-all"
            onClick={() => router.push("/collection")}
          >
            ➕ <span className="font-semibold">Add new collection</span>
          </div>
          {data?.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              isSelected={false}
              onClick={() => router.push(`/collections?id=${collection.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
