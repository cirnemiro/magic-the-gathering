import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const postCollection = async (collection: any): Promise<any> => {
  const postCollection = await CollectionsRepository.postCollection(collection);
  return postCollection;
};
