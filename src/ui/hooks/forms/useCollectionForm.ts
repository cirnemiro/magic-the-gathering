import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import { useFormik } from "formik";
import usePutCollection from "../api/usePutCollection";
import { SelectedCard } from "../logic/useCollectionManager";
import { useRouter } from "next/navigation";

export const useCollectionForm = (
  selectedCards: SelectedCard[],
  initialCollection?: Collection
) => {
  const router = useRouter();

  const { putNewCollection } = usePutCollection();

  const formik = useFormik({
    initialValues: {
      name: initialCollection?.name || "",
      id: initialCollection?.id || undefined,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) errors.name = "Name is required";

      return errors;
    },
    onSubmit: (values) => {
      putNewCollection(
        { ...values, cards: selectedCards },
        {
          onSuccess: (response) => {
            console.log(response, "response");
            formik.setSubmitting(false);
            router.push(`/collection/${response.data?.id}`);
          },
          onError: (error) => {
            console.log(error, "error");
            formik.setSubmitting(false);
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
