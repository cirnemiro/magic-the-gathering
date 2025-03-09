const getCollectionById = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const collections = localStorage.getItem("collections");

        if (collections) {
          const parsedCollections = JSON.parse(collections);
          const collection = parsedCollections.find(
            (col: any) => col.id === id
          );

          if (collection) {
            resolve(collection);
          } else {
            reject("Collection not found");
          }
        } else {
          reject("No collections found");
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

export default getCollectionById;
