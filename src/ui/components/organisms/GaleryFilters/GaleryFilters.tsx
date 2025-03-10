import { FiltersSate } from "components/ui/screens/CardsPage";
import Select from "../../atoms/Inputs/Select";
import { manaSymbols } from "../../atoms/ManaCost/ManaCost";
import Image from "next/image";

interface GaleryFiltersProps {
  filters: FiltersSate;
  setFilters: React.Dispatch<React.SetStateAction<FiltersSate>>;
}

export default function GaleryFilters({
  setFilters,
  filters,
}: GaleryFiltersProps) {
  return (
    <div className=" mx-auto w-full">
      <div className="flex justify-between items-center">
        <div>
          {
            <div className="flex gap-2">
              {Object.keys(manaSymbols).map((symbol, index) => {
                return (
                  <div
                    onClick={() => {
                      if (filters.colors === symbol) {
                        setFilters((filters) => ({
                          ...filters,
                          colors: "",
                        }));
                        return;
                      }
                      setFilters((filters) => ({
                        ...filters,
                        colors: symbol,
                      }));
                    }}
                    className={` cursor-pointer ${
                      filters.colors === symbol
                        ? "outline-2 border-black rounded-full"
                        : ""
                    }`}
                    key={index}
                  >
                    <Image
                      key={index}
                      src={manaSymbols[symbol]}
                      alt={`${symbol} color`}
                      width={35}
                      height={35}
                    />
                  </div>
                );
              })}
            </div>
          }
        </div>
        <div className="flex gap-4">
          <Select
            options={[
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 30, label: "30" },
            ]}
            label="Page size"
            placeholder="Select page size"
            value={filters.pageSize}
            onOptionChange={(value) => {
              setFilters((filters) => ({
                ...filters,
                pageSize: value,
              }));
            }}
          />
          <Select
            options={[
              { label: "Basic", value: "basic" },
              { label: "Legendary", value: "legendary" },
              { label: "Snow", value: "snow" },
              { label: "World", value: "world" },
              { label: "Ongoing", value: "ongoing" },
            ]}
            label="Supertypes"
            placeholder="Select supertypes"
            onOptionChange={(value) => {
              setFilters((filters) => ({
                ...filters,
                supertypes: value,
              }));
            }}
            value={filters.supertypes}
          />
        </div>
      </div>
    </div>
  );
}
