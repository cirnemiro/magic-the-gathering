import { render, screen } from "@testing-library/react";
import { Card as CardType } from "components/_modules/cards/domain/cardsTypes";
import Card from "components/ui/components/atoms/Card/Card";

const mockCard: CardType = {
  name: "Sample Card",
  imageUrl: "https://example.com/card-image.jpg",
  setName: "Set 1",
  text: "This is a sample card.",
  power: "4",
  toughness: "4",
  cmc: 3,
  colors: ["Red"],
  colorIdentity: ["Red"],
  type: "Creature",
  types: ["Creature"],
  rarity: "Common",
  set: "Set1",
  layout: "Normal",
  multiverseid: "12345",
  id: "1",
  foreignNames: [],
  printings: [],
  originalText: "",
  originalType: "",
  legalities: [],
  manaCost: "",
  artist: "",
  number: "",
};

describe("Card Component", () => {
  test("should render the card image when imageUrl is provided", () => {
    render(<Card card={mockCard} />);
    const img = screen.getByAltText(mockCard.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockCard.imageUrl);
  });

  test("should not render an image if imageUrl is not provided", () => {
    const cardWithoutImage = { ...mockCard, imageUrl: undefined };

    render(<Card card={cardWithoutImage} />);

    const img = screen.queryByAltText(cardWithoutImage.name);
    expect(img).not.toBeInTheDocument();
  });
});
