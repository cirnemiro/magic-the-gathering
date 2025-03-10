"use client";
import { useGetAllCards } from "components/_modules/cards/application/get-all/getAllCards";
import Galery from "../components/organisms/Galery/Galery";
import GaleryFilters from "../components/organisms/GaleryFilters/GaleryFilters";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type FiltersSate = {
  pageSize: string;
  contains: string;
  supertypes: string;
  colors: string;
};

export default function CardsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    pageSize: searchParams.get("pageSize") || "20",
    contains: searchParams.get("contains") || "imageUrl",
    supertypes: searchParams.get("supertypes") || "",
    colors: searchParams.get("colors") || "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const { cards, isLoading } = useGetAllCards(filters);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <GaleryFilters setFilters={setFilters} filters={filters} />
      <div className="h-[80vh] overflow-auto">
        <Galery cards={cards?.cards} isLoading={isLoading} gridCols={"6"} />
      </div>
    </div>
  );
}
