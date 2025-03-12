import { getCollectionsById } from "components/_modules/collections/application/get/getCollectionById";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import { useEffect, useState } from "react";

export default function useGetCollectionById(id: string) {
  const [data, setData] = useState<Collection | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getCollectionsById(id)
      .then((response) => {
        if (response.data) {
          setData(response.data);
        } else {
          setError("No collections data available");
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
}
