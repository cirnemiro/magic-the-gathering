"use client";
import useGetAllCollections from "../hooks/useGetAllCollections";
import usePostCollections from "../hooks/usePostCollection";

export default function CollectionsPage() {
  const { data, error, isLoading } = useGetAllCollections();
  const { postNewCollection } = usePostCollections();

  console.log(data, error, isLoading);

  const handlePostCollection = () => {
    postNewCollection({
      id: "1",
      name: "collection1",
      description: "description1",
      cards: [],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1> collections </h1>
      <div className="flex gap-4">
        {data?.map((collection) => (
          <div key={collection.id} className="border p-4 my-4">
            <div>{collection.name}</div>
            <div>{collection.description}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          postNewCollection(
            {
              id: "2",
              name: "collection1",
              description: "description1",
              cards: [],
            },
            {
              onSuccess: (response) => {
                console.log("RESPONSE", response);
              },
              onError: (error) => {
                console.log("ERROR", error);
              },
            }
          )
        }
      >
        add collection
      </button>
    </div>
  );
}
