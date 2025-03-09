import { FiltersSate } from "components/ui/screens/CardsPage";
import Select from "../../atoms/Select";

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
      <div className="flex justify-end gap-4  rounded-md">
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
  );
}
