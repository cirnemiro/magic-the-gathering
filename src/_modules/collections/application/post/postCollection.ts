import { Collection } from "../../domain/collectionsTypes";
import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const postCollection = async (
  collection: Collection
): Promise<{
  data?: Collection;
  error?: string;
  isLoading: boolean;
}> => {
  const postCollection = await CollectionsRepository.postCollection(collection);
  return postCollection;
};
