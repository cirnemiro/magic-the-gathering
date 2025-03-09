import { Collection } from "../../domain/collectionsTypes";
import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const updateCollection = async (
  id: string,
  collection: Collection
): Promise<{
  data?: Collection;
  error?: string;
  isLoading: boolean;
}> => {
  const postCollection = await CollectionsRepository.updateCollectionById(
    id,
    collection
  );
  return postCollection;
};
