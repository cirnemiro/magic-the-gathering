import { postCollection } from "components/_modules/collections/application/post/postCollection";
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

export default function usePostCollections() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postNewCollection = (
    collection: Collection,
    { onSuccess, onError }: PostCollectionOptions
  ) => {
    setIsLoading(true);

    postCollection(collection)
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

  return { isLoading, postNewCollection };
}
