import { Button, Input } from "../../atoms/Inputs";
import CardMini from "../../atoms/CardMini/CardMini";
import { SelectedCard } from "components/ui/hooks/logic/useCollectionManager";
import { useCollectionForm } from "components/ui/hooks/forms/useCollectionForm";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";

interface CollectionFormProps {
  selectedCards: SelectedCard[];
  handleRemoveCard: (cardId: string) => void;
  initialCollection?: Collection;
  totalCards: number;
  handleClearDeck: () => void;
}

export default function CollectionForm({
  handleRemoveCard,
  initialCollection,
  totalCards,
  selectedCards,
  handleClearDeck,
}: CollectionFormProps) {
  const { formik } = useCollectionForm(selectedCards, initialCollection);

  return (
    <div className="h-full p-4 bg-gray-700 w-[35%] text-amber-50 rounded-xl">
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
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-auto max-h-[55vh] p-2">
            {selectedCards.map((selectedCard) => (
              <CardMini
                key={selectedCard.card.id}
                card={selectedCard}
                handleRemoveCard={handleRemoveCard}
              />
            ))}
          </div>
          <div className="flex justify-center flex-col gap-4">
            <Button type="button" variant="secondary" onClick={handleClearDeck}>
              Clear deck
            </Button>
            <Button
              variant="primary"
              type="submit"
              data-testid="save-deck-button"
            >
              Save deck
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
