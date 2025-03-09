//We simulate a request to the server to retrieve all collections and then store them in the local storage.

import { CollectionsRepository } from "../../infrastructure/CollectionsRepository";

export const getAllCollections = async () => {
  const collections = await CollectionsRepository.getAllCollections();
  return collections;
};
