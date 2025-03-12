import { Collection } from "../../domain/collectionsTypes";
import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const putCollection = async (
  collection: Collection
): Promise<{
  data?: Collection;
  error?: string;
  isLoading: boolean;
}> => {
  console.log(collection, "ASDFASDF HHHHHHHHHHHEY");

  return new Promise(async (resolve) => {
    setTimeout(async () => {
      if (collection.id) {
        const updatedCollection =
          await CollectionsRepository.updateCollectionById(collection);
        resolve(updatedCollection);
      } else {
        const postCollection = await CollectionsRepository.postCollection(
          collection
        );
        resolve(postCollection);
      }
    }, 1000);
  });
};
