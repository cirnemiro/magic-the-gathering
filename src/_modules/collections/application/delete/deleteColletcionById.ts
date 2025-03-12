import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const deleteCollectionById = async (id: string) => {
  const collections = await CollectionsRepository.deleteCollectionById(id);
  return collections;
};
