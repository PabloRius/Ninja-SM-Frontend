import { Slider } from "../ui/slider";

export const PriceRangeFilter = ({
  currentRange,
  setRange,
}: {
  currentRange: Array<number>;
  setRange: (newRange: Array<number>) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor="price-range" className="text-sm font-medium">
          Price Range
        </label>
        <span className="text-sm text-muted-foreground">
          £{currentRange[0].toFixed(2)} - £{currentRange[1].toFixed(2)}
        </span>
      </div>
      <Slider
        id="price-range"
        defaultValue={currentRange}
        min={0}
        max={100}
        step={0.5}
        onValueChange={setRange}
        className="py-4"
      />
    </div>
  );
};
