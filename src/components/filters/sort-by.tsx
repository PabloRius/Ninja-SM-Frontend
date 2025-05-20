import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SortBy = ({
  currentValue,
  setValue,
}: {
  currentValue: string;
  setValue: (newValue: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="sort" className="text-sm font-medium">
        Sort By
      </label>
      <Select value={currentValue} onValueChange={setValue}>
        <SelectTrigger id="sort">
          <SelectValue placeholder="Relevance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="name-asc">Name: A to Z</SelectItem>
          <SelectItem value="name-desc">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
