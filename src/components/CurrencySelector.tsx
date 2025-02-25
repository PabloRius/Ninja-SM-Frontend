import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="currency" className="text-sm font-medium text-gray-700">
        Currency:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="GBP">GBP (£)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
      </select>
    </div>
  );
}
