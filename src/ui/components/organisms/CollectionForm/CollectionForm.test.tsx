import { render, screen, fireEvent } from "@testing-library/react";
import { SelectedCard } from "components/ui/hooks/logic/useCollectionManager";
import { Collection } from "components/_modules/collections/domain/collectionsTypes";
import { Card } from "components/_modules/cards/domain/cardsTypes";
import CollectionForm from "./CollectionForm";

jest.mock("../../../hooks/forms/useCollectionForm", () => ({
  useCollectionForm: jest.fn(() => ({
    formik: {
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      values: { name: "" },
      errors: {},
    },
  })),
}));

const exampleCard: Card = {
  id: "1",
  name: "Black Lotus",
  manaCost: "{0}",
  cmc: 0,
  colors: [],
  colorIdentity: ["B"],
  type: "Artifact",
  types: ["Artifact"],
  subtypes: [],
  rarity: "Rare",
  set: "LEA",
  setName: "Limited Edition Alpha",
  text: "Add three mana of any single color to your mana pool. Then exile Black Lotus.",
  flavor:
    "Ancestral Recall, Time Walk, Black Lotus. These are the stuff of dreams.",
  artist: "Christopher Rush",
  number: "232",
  power: undefined,
  toughness: undefined,
  layout: "normal",
  multiverseid: "600",
  imageUrl:
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card",
  variations: [],
  foreignNames: null,
  printings: ["LEA", "LEB", "VMA"],
  originalText:
    "Add three mana of any single color to your mana pool. Then exile Black Lotus.",
  originalType: "Mono Artifact",
  legalities: [{ format: "Vintage", legality: "Restricted" }],
};

describe("CollectionForm", () => {
  const mockHandleRemoveCard = jest.fn();
  const mockHandleClearDeck = jest.fn();

  const selectedCards: SelectedCard[] = [
    {
      card: exampleCard,
      quantity: 1,
    },
  ];

  const initialCollection: Collection = {
    id: "123",
    name: "My Deck",
    cards: selectedCards,
  };

  it("renders form with input, buttons, and selected cards", () => {
    render(
      <CollectionForm
        handleRemoveCard={mockHandleRemoveCard}
        initialCollection={initialCollection}
        totalCards={1}
        selectedCards={selectedCards}
        handleClearDeck={mockHandleClearDeck}
      />
    );

    expect(
      screen.getByPlaceholderText("Write your deck name")
    ).toBeInTheDocument();
    expect(screen.getByText("1/40")).toBeInTheDocument();
    expect(screen.getByText("Black Lotus")).toBeInTheDocument();
    expect(screen.getByText("Clear deck")).toBeInTheDocument();
    expect(screen.getByText("Save deck")).toBeInTheDocument();
  });

  it("calls handleClearDeck when clicking the 'Clear deck' button", () => {
    render(
      <CollectionForm
        handleRemoveCard={mockHandleRemoveCard}
        initialCollection={initialCollection}
        totalCards={1}
        selectedCards={selectedCards}
        handleClearDeck={mockHandleClearDeck}
      />
    );

    fireEvent.click(screen.getByText("Clear deck"));
    expect(mockHandleClearDeck).toHaveBeenCalled();
  });

  it("calls formik handleSubmit when clicking 'Save deck'", () => {
    const mockHandleSubmit = jest.fn();

    require("../../../hooks/forms/useCollectionForm").useCollectionForm.mockImplementation(
      () => ({
        formik: {
          handleSubmit: mockHandleSubmit,
          handleChange: jest.fn(),
          values: { name: "My Deck" },
          errors: {},
        },
      })
    );

    render(
      <CollectionForm
        handleRemoveCard={mockHandleRemoveCard}
        initialCollection={initialCollection}
        totalCards={1}
        selectedCards={selectedCards}
        handleClearDeck={mockHandleClearDeck}
      />
    );

    fireEvent.click(screen.getByText("Save deck"));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
