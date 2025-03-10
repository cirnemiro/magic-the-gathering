import { putCollection } from "components/_modules/collections/application/put/putCollection";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import { useState } from "react";

type PostCollectionOptions = {
  onSuccess?: (response: {
    data?: Collection;
    error?: string;
    isLoading: boolean;
  }) => void;
  onError?: (error: string) => void;
};

export default function usePutCollection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const putNewCollection = (
    collection: Collection,
    { onSuccess, onError }: PostCollectionOptions
  ) => {
    setIsLoading(true);

    putCollection(collection)
      .then((response) => {
        if (response.data) {
          if (onSuccess) {
            onSuccess(response);
          }
        } else {
          const errMsg = "No collections data available";
          if (onError) {
            onError(errMsg);
          }
        }
      })
      .catch((error) => {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        if (onError) {
          onError(errorMessage);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, putNewCollection };
}
