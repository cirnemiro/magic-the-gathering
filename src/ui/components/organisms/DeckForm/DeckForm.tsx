import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import CardMini from "../../atoms/CardMini/CardMini";
import usePostCollections from "components/ui/hooks/usePostCollection";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useGetCollectionById from "components/ui/hooks/useGetCollectionById";
import { SelectedCard } from "components/ui/screens/CreateDeckPage";
import { Button, Input } from "../../atoms/Inputs";
import { useFormik } from "formik";
import { updateCollection } from "components/_modules/collections/application/update/updateCollection";

interface DeckFormProps {
  selectedCards: SelectedCard[];
  setSelectedCards: (cards: SelectedCard[]) => void;
  totalCards: number;
  handleRemoveCard: (cardId: string) => void;
}

type FormValues = {
  name: string;
  length?: number;
};

export default function DeckForm({
  selectedCards,
  setSelectedCards,
  totalCards,
  handleRemoveCard,
}: DeckFormProps) {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deck");

  const { data: deckData } = useGetCollectionById(deckId || "");

  const initialValues: FormValues = {
    name: deckData?.name || "",
  };

  useEffect(() => {
    if (deckData) {
      setSelectedCards(deckData.cards);
    }
  }, [deckData]);

  const { postNewCollection } = usePostCollections();

  const handleClearDeck = () => {
    setSelectedCards([]);
  };

  const validate = (values: FormValues) => {
    const errors: Record<string, string> = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (totalCards <= 20) {
      errors.length = "Deck must have at least 20 cards";
    }
    return errors;
  };

  const onSubmit = (values: FormValues) => {
    if (deckId) {
      updateCollection(deckId, {
        ...values,
        cards: selectedCards,
      });
    } else {
      postNewCollection(
        {
          ...values,
          cards: selectedCards,
        },
        {
          onSuccess: (response) => {
            console.log("RESPONSE", response);
          },
          onError: (error) => {
            console.log("ERROR", error);
          },
        }
      );
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit,
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <div className="h-full p-4 bg-amber-950 w-[30%] text-amber-50">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <Input
              onChange={formik.handleChange}
              name="name"
              id="name"
              errorMessage={formik.errors.name}
              value={formik.values.name}
              placeholder="Write your deck name"
            />
            <div className="text-right">
              <p>{totalCards}/40</p>
              {formik.errors.length ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.length}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-auto max-h-[55vh] p-2">
            {Object.values(selectedCards).map((selectedCard) => (
              <CardMini
                key={selectedCard.card.id}
                card={selectedCard}
                handleRemoveCard={handleRemoveCard}
              />
            ))}
          </div>
          <div className="flex justify-center flex-col gap-4">
            <Button onClick={handleClearDeck}>Clear deck</Button>
            <Button type="submit">Save deck</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
