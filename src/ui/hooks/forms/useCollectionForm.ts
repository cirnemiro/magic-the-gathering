import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import { useFormik } from "formik";
import usePutCollection from "../api/usePutCollection";
import { SelectedCard } from "../logic/useCollectionManager";

export const useCollectionForm = (
  selectedCards: SelectedCard[],
  initialCollection?: Collection
) => {
  const { putNewCollection } = usePutCollection();

  const formik = useFormik({
    initialValues: {
      name: initialCollection?.name || "",
      id: initialCollection?.id || undefined,
      cards: selectedCards,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) errors.name = "Name is required";

      return errors;
    },
    onSubmit: (values) => {
      putNewCollection(
        { ...values },
        {
          onSuccess: (response) => {
            console.log(response, "response");
          },
          onError: (error) => {
            console.log(error, "error");
          },
        }
      );
    },
    enableReinitialize: true,
  });

  return {
    formik,
    selectedCards,
    putNewCollection,
  };
};
