import { useAlert } from "@/context/AlertContext";
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

  const { showAlert } = useAlert();

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9090";

  const fetchProducts = useCallback(
    async (search: string, supermarket: string, page: number) => {
      setLoading(true);
      try {
        console.log("Fetching data from server");
        const response = await fetch(
          `${baseUrl}/dev/product?name=${search}&supermarket=${supermarket}&minPrice=1&maxPrice=9999&page=${page}&limit=20`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
        setHasMore(data.page < data.totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        showAlert("Error fetching the products", "error");
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  const debouncedFetchProducts = useMemo(
    () => debounce(fetchProducts, 500),
    [fetchProducts]
  );

  useEffect(() => {
    debouncedFetchProducts(search, supermarket, page);
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [search, supermarket, page, debouncedFetchProducts]);

  return { products, loading, hasMore };
};
