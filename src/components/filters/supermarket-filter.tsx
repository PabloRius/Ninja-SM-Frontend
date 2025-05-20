import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SupermarketFilter = ({
  currentValue,
  setValue,
}: {
  currentValue: string;
  setValue: (newValue: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="supermarket" className="text-sm font-medium">
        Supermarket
      </label>
      <Select
        value={currentValue}
        onValueChange={(newValue) => setValue(newValue)}
      >
        <SelectTrigger id="supermarket">
          <SelectValue placeholder="All Supermarkets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Supermarkets</SelectItem>
          <SelectItem value="tesco">Tesco</SelectItem>
          <SelectItem value="sainsburys">Sainsbury's</SelectItem>
          <SelectItem value="asda">Asda</SelectItem>
          <SelectItem value="morrisons">Morrisons</SelectItem>
          <SelectItem value="waitrose">Waitrose</SelectItem>
          <SelectItem value="aldi">Aldi</SelectItem>
          <SelectItem value="lidl">Lidl</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
