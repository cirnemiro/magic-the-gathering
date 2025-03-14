import { Collection } from "../domain/collectionsTypes";
import { v4 as uuidv4 } from "uuid";

export const CollectionsRepository = {
  getAllCollections: async (): Promise<{
    data?: Collection[];
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
    data?: Collection;
    error?: string;
    isLoading: boolean;
  }> => {
    try {
      const collections = JSON.parse(
        localStorage.getItem("collections") || "[]"
      );

      newCollection.id = uuidv4();

      collections.push(newCollection);

      localStorage.setItem("collections", JSON.stringify(collections));

      return { data: newCollection, isLoading: false };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, isLoading: false };
      } else {
        return { error: "An unknown error occurred", isLoading: false };
      }
    }
  },

  getCollectionById: async (
    id: string | number
  ): Promise<{
    data?: Collection;
    error?: string;
    isLoading: boolean;
  }> => {
    try {
      const collections = JSON.parse(
        localStorage.getItem("collections") || "[]"
      );

      const collection = collections.find((col: Collection) => col.id === id);

      if (!collection) {
        return { error: "Collection not found", isLoading: false };
      }

      return { data: collection, isLoading: false };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, isLoading: false };
      } else {
        return { error: "An unknown error occurred", isLoading: false };
      }
    }
  },

  updateCollectionById: async (
    updatedCollection: Collection
  ): Promise<{
    data?: Collection;
    error?: string;
    isLoading: boolean;
  }> => {
    try {
      const collections = JSON.parse(
        localStorage.getItem("collections") || "[]"
      );

      const collectionIndex = collections.findIndex(
        (col: Collection) => col.id === updatedCollection.id
      );

      if (collectionIndex === -1) {
        return { error: "Collection not found", isLoading: false };
      }

      collections[collectionIndex] = {
        ...collections[collectionIndex],
        ...updatedCollection,
      };

      localStorage.setItem("collections", JSON.stringify(collections));

      return { data: updatedCollection, isLoading: false };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, isLoading: false };
      } else {
        return { error: "An unknown error occurred", isLoading: false };
      }
    }
  },
  deleteCollectionById: async (
    id: string | number
  ): Promise<{
    data?: Collection[];
    error?: string;
    isLoading: boolean;
  }> => {
    try {
      const collections = JSON.parse(
        localStorage.getItem("collections") || "[]"
      );

      const updatedCollections = collections.filter(
        (col: Collection) => col.id !== id
      );

      if (collections.length === updatedCollections.length) {
        return { error: "Collection not found", isLoading: false };
      }

      localStorage.setItem("collections", JSON.stringify(updatedCollections));

      return { data: updatedCollections, isLoading: false };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, isLoading: false };
      } else {
        return { error: "An unknown error occurred", isLoading: false };
      }
    }
  },
};
