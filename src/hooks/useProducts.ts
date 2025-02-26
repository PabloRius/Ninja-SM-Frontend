import { Product } from "@/models/Product";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useProducts = (
  search: string,
  supermarket: string,
  page: number
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async (search: string, supermarket: string, page: number) => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching data from server");
        const response = await fetch(
          `http://localhost:9090/dev/product?name=${search}&supermarket=${supermarket}&minPrice=1&maxPrice=9999&page=${page}&limit=20`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
        setHasMore(data.page < data.totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const debouncedFetchProducts = useMemo(
    () => debounce(fetchProducts, 500), // Memoize debounce
    [fetchProducts] // Depend only on fetchProducts
  );

  useEffect(() => {
    debouncedFetchProducts(search, supermarket, page);
    return () => {
      debouncedFetchProducts.cancel(); // Clean up debounce on unmount
    };
  }, [search, supermarket, page, debouncedFetchProducts]);

  return { products, loading, hasMore, error };
};
