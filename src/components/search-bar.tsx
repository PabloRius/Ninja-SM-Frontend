"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PriceRangeFilter } from "./filters/price-range-filter";
import { SortBy } from "./filters/sort-by";
import { SupermarketFilter } from "./filters/supermarket-filter";

export default function SearchBar({
  initialQuery = "",
  initialSupermarket = "",
  initialMinPrice = "",
  initialMaxPrice = "",
  initialSort = "relevance",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [supermarket, setSupermarket] = useState(initialSupermarket);
  const [priceRange, setPriceRange] = useState([
    initialMinPrice ? Number.parseFloat(initialMinPrice) : 0,
    initialMaxPrice ? Number.parseFloat(initialMaxPrice) : 100,
  ]);
  const [sort, setSort] = useState(initialSort);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) params.set("query", query);
    else params.delete("query");

    if (supermarket) params.set("supermarket", supermarket);
    else params.delete("supermarket");

    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    else params.delete("minPrice");

    if (priceRange[1] < 100) params.set("maxPrice", priceRange[1].toString());
    else params.delete("maxPrice");

    if (sort !== "relevance") params.set("sort", sort);
    else params.delete("sort");

    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const resetFilters = () => {
    setQuery("");
    setSupermarket("");
    setPriceRange([0, 100]);
    setSort("relevance");
    router.push("/");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-6 text-base w-full"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-md px-4 sm:px-6"
            >
              <SheetHeader className="px-0">
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your search results with these filters.
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <SupermarketFilter
                  currentValue={supermarket}
                  setValue={setSupermarket}
                />

                <PriceRangeFilter
                  currentRange={priceRange}
                  setRange={setPriceRange}
                />

                <SortBy currentValue={sort} setValue={setSort} />
              </div>

              <SheetFooter>
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-1" onClick={applyFilters}>
                      Apply Filters
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button type="submit" className="px-6">
            Search
          </Button>
        </div>
      </form>

      {(supermarket ||
        priceRange[0] > 0 ||
        priceRange[1] < 100 ||
        sort !== "relevance") && (
        <div className="flex flex-wrap gap-2 mt-4">
          {supermarket && (
            <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center gap-1">
              <span>
                Supermarket:{" "}
                {supermarket.charAt(0).toUpperCase() + supermarket.slice(1)}
              </span>
              <button
                onClick={() => {
                  setSupermarket("");
                  applyFilters();
                }}
                aria-label="Remove supermarket filter"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 100) && (
            <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center gap-1">
              <span>
                Price: £{priceRange[0].toFixed(2)} - £{priceRange[1].toFixed(2)}
              </span>
              <button
                onClick={() => {
                  setPriceRange([0, 100]);
                  applyFilters();
                }}
                aria-label="Remove price filter"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {sort !== "relevance" && (
            <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center gap-1">
              <span>
                Sort:{" "}
                {sort === "price-low"
                  ? "Price: Low to High"
                  : sort === "price-high"
                  ? "Price: High to Low"
                  : sort === "name-asc"
                  ? "Name: A to Z"
                  : sort === "name-desc"
                  ? "Name: Z to A"
                  : sort}
              </span>
              <button
                onClick={() => {
                  setSort("relevance");
                  applyFilters();
                }}
                aria-label="Remove sort filter"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {(supermarket ||
            priceRange[0] > 0 ||
            priceRange[1] < 100 ||
            sort !== "relevance") && (
            <button
              onClick={resetFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
