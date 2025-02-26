import { Product } from "@/models/Product";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";

export const useProducts = (
  search: string,
  supermarket: string,
  page: number
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
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
  };

  const debouncedFetchProducts = debounce(fetchProducts, 700);

  useEffect(() => {
    debouncedFetchProducts();
  }, [search, supermarket, page]);

  return { products, loading, hasMore, error };
};
