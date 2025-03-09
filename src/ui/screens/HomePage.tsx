"use client";
import useGetAllCollections from "../hooks/useGetAllCollections";

export default function HomePage() {
  const { data, error, isLoading } = useGetAllCollections();

  return (
    <div className="">
      <section>
        <h2 className="text-2xl font-bold">Your Collections</h2>
        <div className="flex gap-4">
          <div className="border p-4 my-4">Add new collection</div>
          {data?.map((collection) => (
            <div key={collection.id} className="border p-4 my-4">
              <div>{collection.name}</div>
              <div>{collection.description}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Your Favourite Cards</h2>
        <div className="flex gap-4">
          {data?.map((collection) => (
            <div key={collection.id} className="border p-4 my-4">
              <div>{collection.name}</div>
              <div>{collection.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
