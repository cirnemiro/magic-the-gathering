import { deleteCollectionById } from "components/_modules/collections/application/delete/deleteColletcionById";
import { putCollection } from "components/_modules/collections/application/put/putCollection";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import { useState } from "react";

type DeleteCollectionOptions = {
  onSuccess?: (response: {
    data?: Collection[];
    error?: string;
    isLoading: boolean;
  }) => void;
  onError?: (error: string) => void;
};

export default function useDeleteCollectionById() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteCollection = (
    id: string,
    { onSuccess, onError }: DeleteCollectionOptions
  ) => {
    setIsLoading(true);

    deleteCollectionById(id)
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

  return { isLoading, deleteCollection };
}
