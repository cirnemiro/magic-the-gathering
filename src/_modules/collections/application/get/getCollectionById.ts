import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const getCollectionsById = async (id: string) => {
  const collections = await CollectionsRepository.getCollectionById(id);
  return collections;
};
