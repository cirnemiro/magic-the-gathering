import { Collection } from "../domain/collectionsTypes";

export const CollectionsRepository = {
  getAllCollections: async (): Promise<{
    data?: any;
    error?: string;
    isLoading: boolean;
  }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let collections = localStorage.getItem("collections");

      if (!collections) {
        collections = JSON.stringify([]);
        localStorage.setItem("collections", collections);
      }

      return { data: JSON.parse(collections), isLoading: false };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, isLoading: false };
      } else {
        return { error: "An unknown error occurred", isLoading: false };
      }
    }
  },
  postCollection: async (
    newCollection: Collection
  ): Promise<{
    data?: any;
    error?: string;
    isLoading: boolean;
  }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

      let collections = localStorage.getItem("collections");

      console.log(collections, "collections XXXXXXXXXXX");

      if (!collections) {
        return { error: "No collections data available", isLoading: false };
      } else {
        collections = JSON.parse(collections);
      }

      console.log(collections, "collections XXXXXXXXXXXXXXXXX");

      collections.push(newCollection);

      localStorage.setItem("collections", JSON.stringify(collections));

      return { data: collections, isLoading: false };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, isLoading: false };
      } else {
        return { error: "An unknown error occurred", isLoading: false };
      }
    }
  },
};
