"use client";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import { error } from "console";

export default function HomePage() {
  const { cards, isLoading, error } = useGetAllCards({ pageSize: 100 });

  console.log(error);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  // if (error) {
  //   return <div> Error: {error.message} </div>;
  // }

  return (
    <div>
      Home Page
      <div>
        {cards?.cards.map((card) => (
          <div key={card.id}>{card.name}</div>
        ))}
      </div>
    </div>
  );
}
